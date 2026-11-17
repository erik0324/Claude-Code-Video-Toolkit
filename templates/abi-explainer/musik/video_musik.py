"""Musik und Taktplan für Video 0.1 (später: jede Lektion).

Aufruf aus dem Ordner der Vorlage:  python3 musik/video_musik.py 0.1
Schreibt public/musik-<lektion>.wav (−16 LUFS) und src/timing.json (Tempo + Teile in Takten).
Braucht den Python des Lemo-Opuscar-Sampler (LEMO_PY) und ffmpeg.
"""
import json, os, subprocess, sys
sys.path.insert(0, os.path.dirname(__file__))
import musik as M
import soundfile as sf

lek = sys.argv[1] if len(sys.argv) > 1 else '0.1'
p = M.plan(lek)
# Teile des Skripts in Takten (Skript-Zeiten auf Taktgrenzen gerundet); Stil je Teil nach Video-Stil
TEILE = [('hook', 3, 'G'), ('kapitelkarte', 2, 'G'), ('grundbegriffe', 19, 'I'), ('achsen', 20, 'I'),
         ('schnittpunkte', 18, 'I'), ('fehlerfalle', 6, 'I'), ('ballwurf', 14, 'F'),
         ('abiaufgabe', 16, 'I'), ('abikarte', 5, 'I'), ('abschluss', 6, 'G')]
secs = []
for name, bars, st in TEILE:
    if secs and secs[-1][0] == st: secs[-1][1] += bars
    else: secs.append([st, bars])
sections = [(st, bars, 2 if i == len(secs) - 1 else (1 if st == 'I' else 0)) for i, (st, bars) in enumerate(secs)]
BAR = 4 * 60 / p['bpm']
total = sum(s[1] for s in sections) * BAR + 1.5
mus, bounds = M.score(p, sections, total)
e = total - 1.5; import numpy as np
tt = np.arange(len(mus)) / M.SR
mus *= np.interp(tt, [0, e - BAR, e + .4, total], [1, 1, 0, 0])[:, None]    # letzter Takt blendet aus
os.makedirs('public', exist_ok=True)
raw = f'public/.musik-{lek}-roh.wav'; out = f'public/musik-{lek}.wav'
sf.write(raw, mus / max(1e-9, np.abs(mus).max()) * .9, M.SR)
subprocess.run(['ffmpeg', '-v', 'error', '-y', '-i', raw, '-af', 'loudnorm=I=-16:TP=-1.5', '-ar', '48000', out], check=True)
os.remove(raw)
t = 0; teile = []
for name, bars, st in TEILE:
    teile.append(dict(name=name, startBar=t, bars=bars, stil=st)); t += bars
json.dump(dict(lektion=lek, bpm=p['bpm'], key=p['key'], mode=p['mode'], teile=teile, totalBars=t), open('src/timing.json', 'w'), indent=1)
print(lek, p['bpm'], 'BPM', p['key'], p['mode'], '| Länge', round(e, 2), 's |', [(s, b) for s, b, _ in sections])
