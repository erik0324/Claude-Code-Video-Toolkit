"""Musik-Baukasten für die Abi-Erklärvideos.

Drei Stile im Wechsel (Video-Stil, Musik-Dramaturgie):
  G  Elektronisch   Hook, Kapitelkarte, Abschluss
  I  Mischform      Rechenteil: tiefe Marimba rahmt, unter der Stimme fast weg, darüber Sounddesign
  F  Lo-Fi          Anwendung und Modellieren

Pro Video gelten EIN Tempo und EINE Tonart für alle Teile, deshalb kann jeder Wechsel einen
Takt lang überblenden. Damit nicht jedes Video gleich klingt, leitet `plan(lektion)` aus der
Lektionsnummer eine eigene Variante ab: Tonart je Kapitel, Akkordfolge, Tempo, Muster und
Klangfarben aus festen Pools. Gleiche Lektion = gleiche Musik (reproduzierbar).

Braucht den Lemo-Opuscar-Sampler (VCSL, VSCO 2 CE, Salamander) unter LEMO.
"""
import hashlib, os, sys
import numpy as np

LEMO = os.environ.get('LEMO', '/home/user/Lemo-Opuscar')
sys.path.insert(0, LEMO)
from core.audio import sampler as S          # noqa: E402
from core.audio.sfx import SR, lp, hp, bp, noise, env_exp, t_   # noqa: E402

# ---------- Varianten-Pools
KEYS = ['D', 'F', 'E', 'G', 'C', 'A', 'Bb', 'Eb']           # Tonart je Kapitel (Kapitel 0 = D-Dur)
NOTE = {'C': 0, 'C#': 1, 'Db': 1, 'D': 2, 'Eb': 3, 'E': 4, 'F': 5, 'F#': 6, 'Gb': 6, 'G': 7, 'Ab': 8, 'A': 9, 'Bb': 10, 'B': 11}
MAJ = [0, 2, 4, 5, 7, 9, 11]
PROGS = [[1, 6, 4, 5], [1, 5, 6, 4], [4, 5, 3, 6], [6, 4, 1, 5], [2, 5, 1, 6], [1, 3, 4, 5]]
ARPS = [[0, 2, 1, 3, 2, 1, 3, 2], [0, 1, 2, 3, 2, 1, 2, 3], [0, 2, 3, 2, 1, 2, 3, 1], [3, 2, 1, 0, 1, 2, 3, 2]]
G_PADS = ['saw', 'square', 'soft']                            # Klangfarbe der Synth-Fläche
B_PADS = ['vibraphone_bowed', 'cellos', 'violas']                # I bleibt immer tiefe Marimba; nur die Fläche wechselt
F_KEYS = ['piano', 'upright']
F_DRUMS = [[(0, 2.5), (1, 3)], [(0, 1.75, 2.5), (1, 3)], [(0, 2), (1, 3)]]   # (Kick-Zeiten, Snare-Zeiten) in Schlägen


def plan(lektion: str) -> dict:
    """Variante für eine Lektion, z. B. '0.1' oder '3.2'."""
    def pick(pool, feld):   # eigener Hash je Feld, damit die Wahlen unabhängig sind
        return pool[int(hashlib.sha256(f'{lektion}/{feld}'.encode()).hexdigest(), 16) % len(pool)]
    kapitel = int(lektion.split('.')[0])
    p = dict(lektion=lektion, key=KEYS[kapitel % len(KEYS)], bpm=pick(range(86, 95), 'bpm'),
             prog_g=pick(PROGS, 'g'), prog_b=pick(PROGS, 'b'), prog_f=pick(PROGS, 'f'),
             arp=pick(ARPS, 'arp'), pad=pick(G_PADS, 'pad'), b_pad=pick(B_PADS, 'bpad'),
             f_keys=pick(F_KEYS, 'fk'), f_drums=pick(F_DRUMS, 'fd'), seed=pick(range(10_000), 'seed'))
    if lektion == '0.1':    # Grundfassung = die freigegebene Hörprobe B (Marimba tief)
        p.update(prog_b=[1, 6, 4, 5], arp=ARPS[0], b_pad='vibraphone_bowed')
    return p


# ---------- Harmonik
def chord(p, deg, octave=3, n=4):
    """Septakkord der Stufe `deg` in der Tonart p['key'] als Notennamen, enge Lage ab `octave`."""
    root = 12 * (octave + 1) + NOTE[p['key']]
    i = deg - 1
    ms = [root + MAJ[(i + 2 * k) % 7] + 12 * ((i + 2 * k) // 7) for k in range(n)]
    while ms[0] - root > 7: ms = [m - 12 for m in ms]
    return [S.name(m) for m in ms]


def shift(note, k): return S.name(S.midi(note) + 12 * k)


# ---------- Bausteine
def _stereo(x, pan=0.):
    return x if x.ndim == 2 else np.stack([x * np.sqrt((1 - pan) / 2), x * np.sqrt((1 + pan) / 2)], 1)


def _add(buf, x, at, g=1., pan=0.):
    x = _stereo(x, pan); i = int(round(at * SR)); n = min(len(x), len(buf) - i)
    if n > 0 and i >= 0: buf[i:i + n] += g * x[:n]


def _osc(kind, f, d):
    t = t_(d)
    if kind == 'saw': return sum(((f * k * t) % 1) * 2 - 1 for k in (1., 1.006, .994)) / 3
    if kind == 'square': return sum(np.sign(np.sin(2 * np.pi * f * k * t)) for k in (1., 1.004)) / 2 * .7
    return sum(np.sin(2 * np.pi * f * k * t) + .25 * np.sin(4 * np.pi * f * k * t) for k in (1., 1.003)) / 2


def _pad(kind, notes, d):
    x = lp(sum(_osc(kind, S.hz(p), d) for p in notes) / len(notes), 900, 4); tq = t_(d)
    return x * np.minimum(1, tq / .6) * np.minimum(1, (d - tq) / .5)


def _pluck(note, d=.35):
    t = t_(d); f = S.hz(note); s = np.sin(2 * np.pi * f * t)
    return lp((s + .3 * np.sign(s)) * np.exp(-t / .09), 3500)


def _sub(note, d): t = t_(d); return np.sin(2 * np.pi * S.hz(note) * t) * np.exp(-t / .18)


def _kick(v=1.):
    t = t_(.35); f = 50 + 70 * np.exp(-t / .03); return v * np.sin(2 * np.pi * np.cumsum(f) / SR) * np.exp(-t / .12)


def _snare(v=1.):
    d = .25; return v * (lp(bp(noise(d), 900, 5000), 4000) * env_exp(d, .06) * .6 + np.sin(2 * np.pi * 190 * t_(d)) * env_exp(d, .04) * .4)


def _hat(v=1.): return v * hp(noise(.06), 7000) * env_exp(.06, .015)


# ---------- Stile (rendern `bars` Takte ab Sekunde 0; `build` = wie weit der Aufbau schon ist)
def style_G(p, bars, build=0):
    B = 60 / p['bpm']; BAR = 4 * B; buf = np.zeros((int((bars * BAR + 2) * SR), 2))
    for i in range(bars):
        s = i * BAR; c = chord(p, p['prog_g'][i % 4], 3); lvl = i + build
        _add(buf, _pad(p['pad'], c, BAR + .3), s, .35)
        if lvl >= 1:
            for j, k in enumerate(p['arp']): _add(buf, _pluck(shift(c[k], 1)), s + j * B / 2, .22, -.4 if j % 2 else .4)
        if lvl >= 2:
            for j in range(8): _add(buf, _sub(shift(c[0], -1), B / 2), s + j * B / 2, .45 if j % 2 == 0 else .3)
            for j in range(4): _add(buf, _kick(.5), s + j * B)
    return buf


def style_I(p, bars, build=0):
    S.seed(p['seed'] + 1); B = 60 / p['bpm']; BAR = 4 * B; ev = []
    pad = p['b_pad']
    for i in range(bars):
        s = i * BAR; c = chord(p, p['prog_b'][i % 4], 3); lvl = i + build     # tiefe Lage wie Hörprobe B (D3), Bass eine Oktave darunter
        for j, k in enumerate(p['arp']):
            ev.append((s + j * B / 2, 'marimba', c[k], B * .8, .40 * (1 if j % 4 == 0 else .8), -.2 if j % 2 else .15))
        if lvl >= 1:
            if pad == 'vibraphone_bowed':
                ev += [(s, pad, c[1], BAR * .98, .22, -.3), (s, pad, c[3], BAR * .98, .18, .3)]
            else:
                ev.append((s, pad, shift(c[0], 1), BAR * .98, .14, -.2))
        if lvl >= 2: ev.append((s, 'marimba', shift(c[0], -1), B * 2, .45, 0))
    return S.render(ev, dur=bars * BAR + 2)


def style_F(p, bars, build=0):
    S.seed(p['seed'] + 2); B = 60 / p['bpm']; BAR = 4 * B; ev = []
    for i in range(bars):
        s = i * BAR; c = chord(p, p['prog_f'][i % 4], 3); bass = shift(c[0], -1)
        for j, q in enumerate(c): ev.append((s + j * .025, p['f_keys'], q, BAR * 1.1, .26, -.15 + .1 * j))   # Akkorde binden in den nächsten Takt, keine Löcher
        ev.append((s + 2.5 * B + .06, p['f_keys'], shift(c[2], 1), B, .2, .2))
        ev.append((s, 'cellos_pizz', bass, B * 1.5, .5, 0)); ev.append((s, 'cellos', shift(c[0], 0), BAR * 1.02, .1, -.2)); ev.append((s + 2.5 * B + .06, 'cellos_pizz', bass, B, .4, 0))
    k = S.render(ev, dur=bars * BAR + 2); k = np.stack([lp(k[:, 0], 2600, 4), lp(k[:, 1], 2600, 4)], 1)
    d = np.zeros_like(k); kicks, snares = p['f_drums']
    for i in range(bars):
        if i + build < 1: continue
        s = i * BAR
        for q in kicks: _add(d, _kick(.8), s + q * B)
        for q in snares: _add(d, _snare(.45), s + q * B)
        for j in range(8): _add(d, _hat(.18 if j % 2 else .25), s + j * B / 2 + (.06 if j % 2 else 0), .3)
    rng = np.random.default_rng(p['seed']); cr = np.zeros(len(k))
    for _ in range(int(bars * BAR * 14)): cr[rng.integers(0, len(k) - 50)] += rng.uniform(.05, .3) * (rng.random() * 2 - 1)
    return k + d * .55 + _stereo(hp(cr, 1500)) * .5


STYLES = {'G': style_G, 'I': style_I, 'F': style_F}
LEVEL = {'G': -28.0, 'I': -28.0, 'F': -28.5}       # RMS-Ziel je Stil (dBFS), damit Wechsel gleich laut sind


def _rms_db(x):
    x = x[np.abs(x).max(1) > 1e-4]; return 20 * np.log10(np.sqrt((x ** 2).mean()) + 1e-12)


def _lp2(x, f): return np.stack([lp(x[:, 0], f, 4), lp(x[:, 1], f, 4)], 1)


def score(p, sections, total, xfade_bars=1.0):
    """sections: [(stil, takte, build)] nacheinander ab 0 s. Jeder Wechsel überblendet `xfade_bars` Takte:
    der alte Teil läuft über die Grenze weiter, schließt dabei seinen Filter und wird leiser (gleiche Leistung),
    der neue setzt auf dem Schlag ein und öffnet seinen Filter. Gibt (Musik, Grenzen in Sekunden) zurück."""
    B = 60 / p['bpm']; BAR = 4 * B; X = xfade_bars * BAR; N = int(total * SR); tt = np.arange(N) / SR
    out = np.zeros((N, 2)); t0 = 0.; bounds = []
    for n, (st, bars, build) in enumerate(sections):
        first, last = n == 0, n == len(sections) - 1
        x = STYLES[st](p, bars + (0 if last else int(np.ceil(xfade_bars))), build)
        x = x * 10 ** ((LEVEL[st] - _rms_db(x)) / 20)
        seg = np.zeros((N, 2)); _add(seg, x, t0)
        end = t0 + bars * BAR
        fin = np.ones(N) if first else np.clip((tt - t0) / X, 0, 1)            # Einblenden über X
        fout = np.ones(N) if last else np.clip((end + X - tt) / X, 0, 1)        # Ausblenden über X nach der Grenze
        fin, fout = np.sin(fin * np.pi / 2), np.sin(fout * np.pi / 2)          # gleiche Leistung
        filt = np.minimum(fin, fout)                                          # während der Blende zum Tiefpass hin
        dark = _lp2(seg, 700)
        seg = seg * filt[:, None] ** 2 + dark * (1 - filt[:, None] ** 2)
        out += seg * (fin * fout)[:, None]
        if not last: bounds.append(end)
        t0 = end
    return out, bounds


def duck(music, vo_windows, depth_db=-5., cutoff=800., ramp=.4, deep=None):
    """Unter der Stimme: Tiefpass + leiser. `deep` = {(a, b): (dB, Hz)} für Abschnitte mit eigener Tiefe (Stil I)."""
    N = len(music); tt = np.arange(N) / SR; out = music.copy()
    for a, b in vo_windows:
        db, hz = depth_db, cutoff
        for (s, e), v in (deep or {}).items():
            if s <= a < e: db, hz = v
        w = np.interp(tt, [a - ramp, a, b, b + ramp], [0, 1, 1, 0], left=0, right=0)[:, None]
        out = out * (1 - w) + _lp2(music, hz) * w * 10 ** (db / 20)
    return out
