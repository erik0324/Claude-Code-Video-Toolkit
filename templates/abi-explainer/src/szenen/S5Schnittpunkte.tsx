import { interpolate } from 'remotion';
import { Abgang, Auf, Cap, Em, Grund, Kopf, Lbl, Tex } from '../bausteine/Teile';
import { Schritt } from '../bausteine/Rechenweg';
import { Koord, Kurve, Punkt } from '../bausteine/Graph';
import { C, CQ, FONT, RAND } from '../bausteine/stil';
import { RASTEN, useSchlag } from '../bausteine/zeit';

const f = (t: number) => t * t - 2 * t - 3;
/** Schnittstellen von f mit g(x) = x + b: x² − 3x − (3 + b) = 0. */
const schnitt = (b: number) => {
  const d = 2.25 + 3 + b;
  if (d < -1e-9) return [];
  if (Math.abs(d) < 1e-3) return [1.5];
  return [1.5 - Math.sqrt(d), 1.5 + Math.sqrt(d)];
};
const fmt = (v: number) => (Math.round(v * 100) / 100).toString().replace('.', '{,}');

export const S5Schnittpunkte: React.FC<{ schlaege: number }> = ({ schlaege }) => {
  const s = useSchlag();
  // Signatur-Bewegung (Graph-Labor): die Gerade rastet auf Schlägen nach unten, die Ablesung zählt mit
  const b = interpolate(s, [44, 45, 50, 51, 56, 57], [1, -2, -2, -5.25, -5.25, -8], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: RASTEN });
  const xs = s < 44 ? [-1, 4] : schnitt(b);
  return (
    <Grund meta="0.1 · Teil 3 · Schnittpunkte zweier Graphen">
      <Abgang schlaege={schlaege}>
        <Kopf a={0} zeile="Teil 3 · Schnittpunkte zweier Graphen" titel="Gleichsetzen findet die gemeinsamen Punkte" aus={8.5} breite={CQ(56)} />
        {s >= 8.5 && s < 39.5 && (
          <div style={{ position: 'absolute', left: RAND, top: CQ(9) }}>
            <Schritt n={1} a={9} aus={39} tex="f(x) = g(x)" grau={12} />
            <Schritt n={2} a={12} aus={39} tex="x^2 - 2x - 3 = x + 1" grau={16} />
            <Schritt n={3} a={16} aus={39} tex="x^2 - 3x - 4 = 0" grau={21} />
            <Schritt n={4} a={21} aus={39} tex="x_{1,2} = 1{,}5 \pm \sqrt{2{,}25 + 4}" grau={27} />
            <Schritt n={5} a={27} aus={39} tex="x_1 = -1, \quad x_2 = 4" grau={32} />
            <Schritt n={6} a={32} aus={39} tex="S_1(-1 \mid 0), \quad S_2(4 \mid 5)" fach />
          </div>
        )}
        {s >= 39.5 && (
          <div style={{ position: 'absolute', left: CQ(5), top: CQ(9), width: CQ(38) }}>
            <Lbl a={40}>Gerade</Lbl>
            <Auf a={40.4} block><div style={{ margin: `${CQ(0.6)}px 0 ${CQ(2)}px` }}><Tex tex={`g(x) = x ${b < 0 ? '-' : '+'} ${fmt(Math.abs(b))}`} size={CQ(3.2)} /></div></Auf>
            <Lbl a={41}>Schnittpunkte</Lbl>
            <Auf a={41.4} block><div style={{ font: `800 ${CQ(7)}px/1 ${FONT}`, letterSpacing: '-0.04em', color: C.fach, margin: `${CQ(0.8)}px 0 ${CQ(1.4)}px` }}>{xs.length}</div></Auf>
            <Lbl a={42}>Ausdruck unter der Wurzel</Lbl>
            <Auf a={42.4} block><div style={{ marginTop: CQ(0.6) }}><Tex tex={xs.length === 2 ? '> 0' : xs.length === 1 ? '= 0' : '< 0'} size={CQ(3.2)} /></div></Auf>
          </div>
        )}
        <div style={{ position: 'absolute', left: CQ(56), top: CQ(7) }}>
          <Koord w={CQ(39)} h={CQ(42)} x0={-3} x1={6} y0={-9} y1={8} a={0.5} gitterY={2} ticksX={[-2, 2, 4]} ticksY={[-4, 4]}>
            {(abb) => (
              <>
                <Kurve abb={abb} f={f} von={-2.6} bis={4.6} a={1} dauer={2} farbe={C.tinte} breite={4} />
                <Kurve abb={abb} f={(t) => t + b} von={-3} bis={6} a={3} dauer={0.6} farbe={C.fach} />
                {s >= 5 && xs.map((t, i) => <Punkt key={i + '-' + xs.length} abb={abb} x={t} y={t + b} a={s < 44 ? 5 + i * 0.5 : 0} r={13} ring label={s < 44 ? (i ? 'S₂(4 | 5)' : 'S₁(−1 | 0)') : undefined} labelDx={i ? 18 : -150} labelDy={i ? -16 : -18} farbe={C.tinte} />)}
              </>
            )}
          </Koord>
        </div>
        <Cap rechts={CQ(46)} saetze={[
          { a: 9, aus: 15.5, lead: 'Gleichsetzen', text: <>Dort haben beide <Em>denselben Funktionswert</Em>.</> },
          { a: 16.5, aus: 26.5, text: <>Alles auf eine Seite, dann die <Em>pq-Formel</Em>.</> },
          { a: 32.5, aus: 39, text: <>Die y-Werte kommen aus <Em>g</Em>.</> },
          { a: 44, aus: 50, text: <>Zwei Lösungen: <Em>zwei Schnittpunkte</Em>.</> },
          { a: 50.5, aus: 56, text: <>Null unter der Wurzel: ein <Em>Berührpunkt</Em>.</> },
          { a: 56.5, aus: schlaege, text: <>Negativ unter der Wurzel: <Em>kein</Em> Schnittpunkt.</> },
        ]} />
      </Abgang>
    </Grund>
  );
};
