import { Abgang, Auf, Cap, Em, Grund, Lbl } from '../bausteine/Teile';
import { Koord, Kurve, Punkt } from '../bausteine/Graph';
import { C, CQ, FONT } from '../bausteine/stil';
import { useSchlag, zeichne } from '../bausteine/zeit';

const f = (t: number) => t * t - 2 * t - 3;
const g = (t: number) => t + 1;

/** Hook im Graph-Labor-Look: links die Ablesung, rechts der Graph. */
export const S1Hook: React.FC<{ schlaege: number }> = ({ schlaege }) => {
  const s = useSchlag();
  const n = s < 9 ? '?' : s < 9.5 ? '1' : '2';
  return (
    <Grund meta="Lektion 0.1 · Funktionen und ihre Darstellung">
      <Abgang schlaege={schlaege}>
        <div style={{ position: 'absolute', left: CQ(5), top: CQ(14), width: CQ(34) }}>
          <Lbl a={1}>Graphen</Lbl>
          <Auf a={1.3} block><div style={{ font: `700 ${CQ(3.2)}px/1 ${FONT}`, letterSpacing: '-0.02em', margin: `${CQ(0.8)}px 0 ${CQ(2)}px` }}>{s < 8 ? '1' : '2'}</div></Auf>
          <Lbl a={2}>Schnittpunkte</Lbl>
          <Auf a={2.3} block><div style={{ font: `800 ${CQ(9)}px/1 ${FONT}`, letterSpacing: '-0.04em', color: s >= 9 ? C.fach : C.grau, margin: `${CQ(0.8)}px 0` }}>{n}</div></Auf>
        </div>
        <div style={{ position: 'absolute', left: CQ(47), top: CQ(6) }}>
          <Koord w={CQ(47)} h={CQ(40)} x0={-3} x1={6} y0={-6} y1={10} gitterY={2} ticksX={[-2, 2, 4]} ticksY={[-4, 4, 8]}>
            {(abb) => {
              const t = -2 + 6.2 * zeichne(s, 5, 3);
              return (
                <>
                  <Kurve abb={abb} f={f} von={-2.5} bis={4.6} a={1} dauer={4} farbe={C.tinte} />
                  {s >= 5 && s < 8.4 && <circle cx={abb.sx(t)} cy={abb.sy(f(t))} r={12} fill={C.tinte} />}
                  <Kurve abb={abb} f={g} von={-3} bis={6} a={8} dauer={0.6} farbe={C.fach} />
                  <Punkt abb={abb} x={-1} y={0} a={9} r={13} ring />
                  <Punkt abb={abb} x={4} y={5} a={9.5} r={13} ring />
                </>
              );
            }}
          </Koord>
        </div>
        <Cap rechts={CQ(56)} saetze={[{ a: 9.5, aus: 99, lead: 'Die Frage', text: <>Zwei Graphen, zwei <Em>Schnittpunkte</Em>. Wie findet man sie, ohne zu raten?</> }]} />
      </Abgang>
    </Grund>
  );
};
