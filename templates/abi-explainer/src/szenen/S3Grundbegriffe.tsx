import { Fragment } from 'react';
import { Abgang, Auf, Cap, Em, Grund, Kopf, Lbl, Tex } from '../bausteine/Teile';
import { Koord, Kurve, Punkt } from '../bausteine/Graph';
import { C, CQ, FONT, RAND } from '../bausteine/stil';
import { auf, useSchlag, zeichne } from '../bausteine/zeit';

const f = (t: number) => t * t - 2 * t - 3;
const TAB = [-2, -1, 0, 1, 2, 3, 4];
const T = (v: number) => String(v).replace('-', '−');

/** Zuordnung x → y als Pfeildiagramm (jedem x genau ein y). */
const Zuordnung: React.FC<{ a: number; aus: number }> = ({ a, aus }) => {
  const s = useSchlag();
  if (s < a || s > aus + 0.5) return null;
  const xs = [-1, 0, 1, 3]; const ys = [0, -3, -4];
  const q = auf(s, aus, 0.4);
  return (
    <svg width={760} height={520} style={{ overflow: 'visible', opacity: 1 - q, fontFamily: FONT }}>
      {[0, 1].map((k) => (
        <g key={k} opacity={auf(s, a + k * 0.5, 0.5)}>
          <rect x={k ? 470 : 40} y={30} width={220} height={440} rx={110} fill="none" stroke={C.grau} strokeWidth={2.5} />
          <text x={k ? 580 : 150} y={510} textAnchor="middle" fontSize={30} fontWeight={700} fill={C.label}>{k ? 'W' : 'D'}</text>
        </g>
      ))}
      {xs.map((v, i) => <text key={'x' + v} x={150} y={112 + i * 95} textAnchor="middle" fontSize={42} fontWeight={600} fill={C.tinte} opacity={auf(s, a + 1, 0.4)}>{T(v)}</text>)}
      {ys.map((v, i) => <text key={'y' + v} x={580} y={142 + i * 120} textAnchor="middle" fontSize={42} fontWeight={600} fill={C.tinte} opacity={auf(s, a + 1.5, 0.4)}>{T(v)}</text>)}
      {xs.map((v, i) => {
        const p = zeichne(s, a + 2 + i * 0.5, 0.5);
        const x1 = 190, y1 = 98 + i * 95, x2 = 535, y2 = 128 + ys.indexOf(f(v)) * 120;
        return p > 0 ? <line key={'p' + v} x1={x1} y1={y1} x2={x1 + (x2 - x1) * p} y2={y1 + (y2 - y1) * p} stroke={C.fach} strokeWidth={4} strokeLinecap="round" /> : null;
      })}
    </svg>
  );
};

export const S3Grundbegriffe: React.FC<{ schlaege: number }> = ({ schlaege }) => {
  const s = useSchlag();
  return (
    <Grund meta="0.1 · Teil 1 · Grundbegriffe">
      <Abgang schlaege={schlaege}>
        {/* A: Definition (0–17) */}
        <Kopf a={0} zeile="Teil 1 · Grundbegriffe" titel="Eine Funktion ordnet jedem x genau ein y zu" aus={17} breite={CQ(70)} />
        {s < 17.6 && (
          <div style={{ position: 'absolute', left: RAND, top: CQ(19), width: CQ(42) }}>
            <Lbl a={2} aus={17}>Definition · Funktion</Lbl>
            <div style={{ height: CQ(1.2) }} />
            <Auf a={3} aus={17} block><div style={{ font: `500 ${CQ(2.1)}px/1.4 ${FONT}` }}>Jedem <i>x</i> aus der <b>Definitionsmenge D</b></div></Auf>
            <Auf a={3.5} aus={17} block><div style={{ font: `500 ${CQ(2.1)}px/1.4 ${FONT}` }}>wird <b>genau ein</b> <i>y</i> zugeordnet.</div></Auf>
            <div style={{ height: CQ(2.4) }} />
            <Lbl a={6} aus={17}>Wertemenge</Lbl>
            <Auf a={6.4} aus={17} block><div style={{ font: `500 ${CQ(2.1)}px/1.4 ${FONT}`, marginTop: CQ(1) }}>Alle Funktionswerte bilden <b>W</b>.</div></Auf>
          </div>
        )}
        <div style={{ position: 'absolute', left: CQ(55), top: CQ(16) }}>
          <Zuordnung a={7} aus={17} />
        </div>

        {/* B: Funktionsgleichung und Funktionsterm (18–29) */}
        {s >= 18 && s < 29.5 && (
          <div style={{ position: 'absolute', left: 0, right: 0, top: 400, textAlign: 'center' }}>
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <Auf a={18} aus={29}><Tex tex="y = f(x) = x^2 - 2x - 3" size={CQ(5.6)} /></Auf>
              <div style={{ position: 'absolute', left: 0, right: 0, top: '100%', marginTop: 18, height: 22, borderBottom: `${CQ(0.15)}px solid ${C.tinte}`, borderLeft: `${CQ(0.15)}px solid ${C.tinte}`, borderRight: `${CQ(0.15)}px solid ${C.tinte}`, clipPath: `inset(0 ${(1 - auf(s, 21, 0.6)) * 100}% 0 0)`, opacity: 1 - auf(s, 29, 0.4) }} />
              <div style={{ position: 'absolute', left: 0, right: 0, top: '100%', marginTop: 54 }}><Auf a={21.5} aus={29}><span style={{ font: `600 ${CQ(1.6)}px ${FONT}`, color: C.tinte2 }}>Funktionsgleichung</span></Auf></div>
              <div style={{ position: 'absolute', right: 0, width: '47%', bottom: '100%', marginBottom: 18, height: 22, borderTop: `${CQ(0.15)}px solid ${C.fach}`, borderLeft: `${CQ(0.15)}px solid ${C.fach}`, borderRight: `${CQ(0.15)}px solid ${C.fach}`, clipPath: `inset(0 ${(1 - auf(s, 24, 0.6)) * 100}% 0 0)`, opacity: 1 - auf(s, 29, 0.4) }} />
              <div style={{ position: 'absolute', right: 0, width: '47%', bottom: '100%', marginBottom: 54 }}><Auf a={24.5} aus={29}><span style={{ font: `700 ${CQ(1.6)}px ${FONT}`, color: C.fachText }}>Funktionsterm</span></Auf></div>
            </div>
          </div>
        )}

        {/* C: Wertetabelle → Punkte → Parabel → D und W (30–76) */}
        {s >= 30 && (
          <>
            <div style={{ position: 'absolute', left: RAND, top: CQ(7.5), width: CQ(40) }}>
              <Lbl a={30}>Beispiel</Lbl>
              <Auf a={30.4} block><Tex tex="f(x) = x^2 - 2x - 3" size={CQ(3.3)} /></Auf>
            </div>
            <div style={{ position: 'absolute', left: RAND, top: CQ(17.5), display: 'grid', gridTemplateColumns: `110px repeat(7, 92px)` }}>
              {[0, 1].map((r) => (
                <Fragment key={'r' + r}>
                  <div style={{ height: 78, display: 'grid', placeItems: 'center start', borderTop: `${CQ(0.12)}px solid ${C.tinte}`, visibility: s >= 30.8 ? 'visible' : 'hidden' }}><Tex tex={r ? 'f(x)' : 'x'} size={38} color={C.label} /></div>
                  {TAB.map((v, i) => (
                    <div key={r + '-' + v} style={{ height: 78, display: 'grid', placeItems: 'center', borderTop: `${CQ(0.12)}px solid ${C.tinte}`, clipPath: s >= 30.8 ? 'none' : 'inset(0 100% 0 0)' }}>
                      <Auf a={31 + i * 0.75 + (r ? 0.35 : 0)}><Tex tex={T(r ? f(v) : v)} size={40} /></Auf>
                    </div>
                  ))}
                </Fragment>
              ))}
            </div>
            <div style={{ position: 'absolute', left: RAND, top: CQ(28), width: CQ(34) }}>
              <Lbl a={56}>Definitionsmenge</Lbl>
              <Auf a={56.4} block><Tex tex="D = \mathbb{R}" size={CQ(2.6)} /></Auf>
              <div style={{ height: CQ(1.6) }} />
              <Lbl a={60}>Wertemenge · Scheitel S(1 | −4)</Lbl>
              <Auf a={60.4} block><Tex tex="W = \{\, y \mid y \geq -4 \,\}" size={CQ(2.6)} /></Auf>
            </div>
            <div style={{ position: 'absolute', left: CQ(52), top: CQ(6) }}>
              <Koord w={CQ(42)} h={CQ(44)} x0={-3} x1={5} y0={-5} y1={6} a={30} ticksX={[-2, 2, 4]} ticksY={[-4, 4]}>
                {(abb) => (
                  <>
                    <rect x={abb.sx(-3) - 30} width={abb.sx(5) - abb.sx(-3) + 60} y={abb.sy(6)} height={(abb.sy(-4) - abb.sy(6)) * auf(s, 61, 0.8)} fill={C.fachHell} opacity={0.75} />
                    {s >= 61 && <line x1={abb.sx(-3)} x2={abb.sx(5)} y1={abb.sy(-4)} y2={abb.sy(-4)} stroke={C.fach} strokeWidth={2} strokeDasharray="10 8" opacity={auf(s, 61, 0.8)} />}
                    <Kurve abb={abb} f={f} von={-2.3} bis={4.3} a={44} dauer={5} />
                    {TAB.map((v, i) => <Punkt key={v} abb={abb} x={v} y={f(v)} a={36.5 + i} farbe={C.tinte} r={11} />)}
                    <Punkt abb={abb} x={1} y={-4} a={52} r={14} ring label="S(1 | −4)" labelDx={22} labelDy={40} farbe={C.fach} />
                  </>
                )}
              </Koord>
            </div>
          </>
        )}
        <Cap rechts={CQ(50)} saetze={[
          { a: 8, aus: 16.5, text: <>Jedes <i>x</i> hat <Em>genau ein</Em> Ziel.</> },
          { a: 36, aus: 43.5, lead: 'Wertetabelle', text: <>Jeder Wert wird ein <Em>Punkt</Em>.</> },
          { a: 49, aus: 55, text: <>Die Punkte ergeben eine <Em>Parabel</Em>.</> },
        ]} />
      </Abgang>
    </Grund>
  );
};
