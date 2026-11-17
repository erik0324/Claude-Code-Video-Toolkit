import { Fragment } from 'react';
import { Abgang, Auf, Grund, Karte, Kopf, Tex, Wisch } from '../bausteine/Teile';
import { Koord, Kurve, Punkt } from '../bausteine/Graph';
import { C, FONT, RAND, breite, x } from '../bausteine/stil';
import { auf, useSchlag, zeichne } from '../bausteine/zeit';

const f = (t: number) => t * t - 2 * t - 3;
const TAB = [-2, -1, 0, 1, 2, 3, 4];

/** Zuordnung x → y als Pfeildiagramm (jedem x genau ein y). */
const Zuordnung: React.FC<{ a: number; aus: number }> = ({ a, aus }) => {
  const s = useSchlag();
  const xs = [-1, 0, 1, 3]; const ys = [0, -3, -4];
  const ziel = (v: number) => ys.indexOf(f(v));
  const q = auf(s, aus, 0.4);
  return (
    <svg width={760} height={520} style={{ overflow: 'visible', opacity: 1 - q, fontFamily: FONT }}>
      {[0, 1].map((k) => (
        <g key={k} opacity={auf(s, a + k * 0.5, 0.5)}>
          <rect x={k ? 470 : 40} y={30} width={220} height={440} rx={110} fill="none" stroke={C.linie} strokeWidth={3} />
          <text x={k ? 580 : 150} y={505} textAnchor="middle" fontSize={30} fontWeight={700} fill={C.tinte2}>{k ? 'W' : 'D'}</text>
        </g>
      ))}
      {xs.map((v, i) => <text key={'x' + v} x={150} y={110 + i * 95} textAnchor="middle" fontSize={40} fontWeight={600} fill={C.tinte} opacity={auf(s, a + 1, 0.4)}>{String(v).replace('-', '−')}</text>)}
      {ys.map((v, i) => <text key={'y' + v} x={580} y={140 + i * 120} textAnchor="middle" fontSize={40} fontWeight={600} fill={C.tinte} opacity={auf(s, a + 1.5, 0.4)}>{String(v).replace('-', '−')}</text>)}
      {xs.map((v, i) => {
        const p = zeichne(s, a + 2 + i * 0.5, 0.5);
        const x1 = 190, y1 = 98 + i * 95, x2 = 535, y2 = 128 + ziel(v) * 120;
        return p > 0 ? <line key={'p' + v} x1={x1} y1={y1} x2={x1 + (x2 - x1) * p} y2={y1 + (y2 - y1) * p} stroke={C.fach} strokeWidth={4} strokeLinecap="round" /> : null;
      })}
    </svg>
  );
};

export const S3Grundbegriffe: React.FC<{ schlaege: number }> = ({ schlaege }) => {
  const s = useSchlag();
  return (
    <Grund>
      <Abgang schlaege={schlaege}>
        {/* A: Definition (0–17) */}
        <Kopf a={0} zeile="Teil 1 · Grundbegriffe" titel="Eine Funktion ordnet jedem x genau ein y zu" aus={17} />
        <div style={{ position: 'absolute', left: RAND, top: 380, width: breite(6) }}>
          <Wisch a={2} aus={17}>
            <Karte art="definition" titel="Definition: Funktion">
              <Auf a={3} block><div style={{ font: `500 36px/1.45 ${FONT}` }}>Jedem <i>x</i> aus der <b>Definitionsmenge D</b></div></Auf>
              <Auf a={3.5} block><div style={{ font: `500 36px/1.45 ${FONT}` }}>wird <b>genau ein</b> <i>y</i> zugeordnet.</div></Auf>
              <Auf a={6} block><div style={{ font: `500 36px/1.45 ${FONT}`, marginTop: 18 }}>Alle Funktionswerte: <b>Wertemenge W</b></div></Auf>
            </Karte>
          </Wisch>
        </div>
        <div style={{ position: 'absolute', left: x(7) + 20, top: 330 }}>
          <Zuordnung a={7} aus={17} />
        </div>

        {/* B: Funktionsgleichung und Funktionsterm (18–29) */}
        {s >= 17.5 && s < 30 && (
          <div style={{ position: 'absolute', left: 0, right: 0, top: 380, textAlign: 'center' }}>
            <Auf a={18} aus={29}><Tex tex="y = f(x) = x^2 - 2x - 3" size={110} /></Auf>
            <div style={{ position: 'relative', width: 1300, margin: '10px auto 0', height: 160 }}>
              <div style={{ position: 'absolute', left: 30, right: 30, top: 0, height: 22, borderBottom: `4px solid ${C.tinte2}`, borderLeft: `4px solid ${C.tinte2}`, borderRight: `4px solid ${C.tinte2}`, clipPath: `inset(0 ${(1 - auf(s, 21, 0.6)) * 100}% 0 0)`, opacity: 1 - auf(s, 29, 0.4) }} />
              <div style={{ position: 'absolute', left: 30, right: 30, top: 34 }}><Auf a={21.5} aus={29}><span style={{ font: `600 34px ${FONT}`, color: C.tinte2 }}>Funktionsgleichung</span></Auf></div>
            </div>
            <div style={{ position: 'absolute', left: 1028, top: -70, width: 520, textAlign: 'center' }}>
              <div style={{ height: 22, borderTop: `4px solid ${C.fach}`, borderLeft: `4px solid ${C.fach}`, borderRight: `4px solid ${C.fach}`, clipPath: `inset(0 ${(1 - auf(s, 24, 0.6)) * 100}% 0 0)`, opacity: 1 - auf(s, 29, 0.4) }} />
            </div>
            <div style={{ position: 'absolute', left: 1028, top: -130, width: 520, textAlign: 'center' }}>
              <Auf a={24.5} aus={29}><span style={{ font: `700 34px ${FONT}`, color: C.fachText }}>Funktionsterm</span></Auf>
            </div>
          </div>
        )}

        {/* C: Wertetabelle → Punkte → Parabel → D und W (30–76) */}
        {s >= 29.5 && (
          <>
            <div style={{ position: 'absolute', left: RAND, top: 150 }}>
              <Auf a={30} block><div style={{ font: `600 20px ${FONT}`, letterSpacing: '0.08em', textTransform: 'uppercase', color: C.fachText }}>Beispiel</div></Auf>
              <Auf a={30.25} block><Tex tex="f(x) = x^2 - 2x - 3" size={60} /></Auf>
            </div>
            <div style={{ position: 'absolute', left: RAND, top: 330, display: 'grid', gridTemplateColumns: `110px repeat(7, 96px)`, rowGap: 0, background: C.blatt, borderRadius: 16, padding: '6px 18px', border: `1px solid ${C.linie}`, opacity: auf(s, 30.5, 0.5) }}>
              {[0, 1].map((r) => (
                <Fragment key={'r' + r}>
                  <div key={'k' + r} style={{ height: 76, display: 'grid', placeItems: 'center start', borderBottom: r ? 'none' : `1px solid ${C.linie}` }}><Tex tex={r ? 'f(x)' : 'x'} size={38} color={C.tinte2} /></div>
                  {TAB.map((v, i) => (
                    <div key={r + '-' + v} style={{ height: 76, display: 'grid', placeItems: 'center', borderBottom: r ? 'none' : `1px solid ${C.linie}`, opacity: auf(s, 31 + i * 0.75 + (r ? 0.35 : 0), 0.35) }}>
                      <Tex tex={String(r ? f(v) : v)} size={40} />
                    </div>
                  ))}
                </Fragment>
              ))}
            </div>
            <div style={{ position: 'absolute', left: RAND, top: 560, width: breite(5) + 40 }}>
              <Auf a={56} block><Karte art="neutral"><Tex tex="D = \mathbb{R}" size={46} /><div style={{ font: `500 26px ${FONT}`, color: C.tinte2, marginTop: 6 }}>Jede reelle Zahl darf eingesetzt werden.</div></Karte></Auf>
              <div style={{ height: 22 }} />
              <Auf a={60} block><Karte art="neutral"><Tex tex="W = \{\, y \mid y \geq -4 \,\}" size={46} /><div style={{ font: `500 26px ${FONT}`, color: C.tinte2, marginTop: 6 }}>Kleinster Wert am Scheitel S(1 | −4).</div></Karte></Auf>
            </div>
            <div style={{ position: 'absolute', left: x(6) + 60, top: 150 }}>
              <Koord w={810} h={840} x0={-3} x1={5} y0={-5} y1={6} a={30} ticksX={[-2, 2, 4]} ticksY={[-4, 4]}>
                {(abb) => (
                  <>
                    <rect x={abb.sx(-3) - 30} width={abb.sx(5) - abb.sx(-3) + 60} y={abb.sy(6)} height={(abb.sy(-4) - abb.sy(6)) * auf(s, 61, 0.8)} fill={C.fachHell} opacity={0.9} />
                    {auf(s, 61, 0.8) > 0 && <line x1={abb.sx(-3)} x2={abb.sx(5)} y1={abb.sy(-4)} y2={abb.sy(-4)} stroke={C.fach} strokeWidth={2} strokeDasharray="10 8" opacity={auf(s, 61, 0.8)} />}
                    <Kurve abb={abb} f={f} von={-2.3} bis={4.3} a={44} dauer={5} />
                    {TAB.map((v, i) => <Punkt key={v} abb={abb} x={v} y={f(v)} a={36.5 + i} farbe={C.tinte} r={11} />)}
                    <Punkt abb={abb} x={1} y={-4} a={52} r={14} ring label="S(1 | −4)" labelDx={22} labelDy={40} farbe={C.fach} />
                  </>
                )}
              </Koord>
            </div>
          </>
        )}
      </Abgang>
    </Grund>
  );
};
