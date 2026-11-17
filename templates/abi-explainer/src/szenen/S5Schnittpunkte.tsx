import { interpolate } from 'remotion';
import { Abgang, Auf, Grund, Kopf, Tex } from '../bausteine/Teile';
import { Schritt } from '../bausteine/Rechenweg';
import { Koord, Kurve, Punkt } from '../bausteine/Graph';
import { C, FONT, RAND, x } from '../bausteine/stil';
import { RASTEN, useSchlag } from '../bausteine/zeit';

const f = (t: number) => t * t - 2 * t - 3;
/** Schnittstellen von f mit g(x) = x + b: x² − 3x − (3 + b) = 0. */
const schnitt = (b: number) => {
  const d = 2.25 + 3 + b;
  if (d < -1e-9) return [];
  if (Math.abs(d) < 1e-3) return [1.5];
  return [1.5 - Math.sqrt(d), 1.5 + Math.sqrt(d)];
};

export const S5Schnittpunkte: React.FC<{ schlaege: number }> = ({ schlaege }) => {
  const s = useSchlag();
  // Signatur-Bewegung: die Gerade rastet schrittweise nach unten (b = 1 → −2 → −5,25 → −8)
  const b = interpolate(s, [44, 45, 50, 51, 56, 57], [1, -2, -2, -5.25, -5.25, -8], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: RASTEN });
  const xs = s < 44 ? [-1, 4] : schnitt(b);
  const anzahl = xs.length;
  return (
    <Grund>
      <Abgang schlaege={schlaege}>
        <Kopf a={0} zeile="Teil 3 · Schnittpunkte zweier Graphen" titel="Gleichsetzen findet die gemeinsamen Punkte" />
        {s < 40 && (
          <div style={{ position: 'absolute', left: RAND, top: 330 }}>
            <Schritt n={1} a={9} aus={39} tex="f(x) = g(x)" notiz="gleichsetzen" />
            <Schritt n={2} a={12} aus={39} tex="x^2 - 2x - 3 = x + 1" />
            <Schritt n={3} a={16} aus={39} tex="x^2 - 3x - 4 = 0" notiz="alles auf eine Seite" />
            <Schritt n={4} a={21} aus={39} tex="x_{1,2} = 1{,}5 \pm \sqrt{2{,}25 + 4} = 1{,}5 \pm 2{,}5" />
            <Schritt n={5} a={27} aus={39} tex="x_1 = -1, \quad x_2 = 4" />
            <Schritt n={6} a={32} aus={39} tex="S_1(-1 \mid 0), \quad S_2(4 \mid 5)" fach notiz="y-Werte aus g" />
          </div>
        )}
        {s >= 39.5 && (
          <div style={{ position: 'absolute', left: RAND, top: 360, width: 760 }}>
            <Auf a={40} block><div style={{ font: `800 52px/1.1 ${FONT}`, letterSpacing: '-0.02em' }}>Wie viele Schnittpunkte?</div></Auf>
            <Auf a={41} block><div style={{ font: `500 32px/1.45 ${FONT}`, color: C.tinte2, marginTop: 12 }}>Das entscheidet der Ausdruck unter der Wurzel.</div></Auf>
            <div style={{ display: 'flex', gap: 34, marginTop: 50, alignItems: 'flex-end' }}>
              {[2, 1, 0].map((n, i) => {
                const aktiv = s >= 42 && anzahl === n;
                return (
                  <Auf key={n} a={42 + i * 0.25}>
                    <div style={{ textAlign: 'center', width: 190 }}>
                      <div style={{ font: `800 150px/0.9 ${FONT}`, letterSpacing: '-0.04em', color: aktiv ? C.fach : C.linie }}>{n}</div>
                      <div style={{ font: `600 26px ${FONT}`, color: aktiv ? C.tinte : C.grau, marginTop: 12 }}><Tex tex={['> 0', '= 0', '< 0'][i]} size={34} color={aktiv ? C.tinte : C.grau} /></div>
                    </div>
                  </Auf>
                );
              })}
            </div>
          </div>
        )}
        <div style={{ position: 'absolute', left: x(7), top: 250 }}>
          <Koord w={706} h={740} x0={-3} x1={6} y0={-9} y1={8} a={0.5} gitterY={2} ticksX={[-2, 2, 4]} ticksY={[-4, 4]}>
            {(abb) => (
              <>
                <Kurve abb={abb} f={f} von={-2.6} bis={4.6} a={1} dauer={2} farbe={C.tinte2} breite={4} />
                <Kurve abb={abb} f={(t) => t + b} von={-3} bis={6} a={3} dauer={0.6} farbe={C.fach} clipY={[-9.5, 8.5]} />
                {s >= 5 && xs.map((t, i) => <Punkt key={i + '-' + xs.length} abb={abb} x={t} y={t + b} a={s < 44 ? 5 + i * 0.5 : 0} r={13} ring label={s < 44 ? (i ? 'S₂(4 | 5)' : 'S₁(−1 | 0)') : undefined} labelDx={i ? 18 : -150} labelDy={i ? -16 : -18} farbe={C.tinte} />)}
              </>
            )}
          </Koord>
        </div>
      </Abgang>
    </Grund>
  );
};
