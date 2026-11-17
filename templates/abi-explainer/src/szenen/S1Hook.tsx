import { Abgang, Auf, Grund } from '../bausteine/Teile';
import { Koord, Kurve, Punkt } from '../bausteine/Graph';
import { C, FONT, RAND, x } from '../bausteine/stil';
import { zeichne } from '../bausteine/zeit';

const f = (t: number) => t * t - 2 * t - 3;
const g = (t: number) => t + 1;

export const S1Hook: React.FC<{ schlaege: number }> = ({ schlaege }) => (
  <Grund>
    <Abgang schlaege={schlaege}>
      <div style={{ position: 'absolute', left: RAND, top: 380, width: 720 }}>
        <Auf a={9.5} block><div style={{ font: `800 76px/1.02 ${'Inter'}`, letterSpacing: '-0.03em' }}>Zwei Graphen,</div></Auf>
        <Auf a={10} block><div style={{ font: `800 76px/1.02 ${'Inter'}`, letterSpacing: '-0.03em' }}>zwei Schnittpunkte.</div></Auf>
        <Auf a={10.75} block><div style={{ font: `500 34px ${FONT}`, color: C.tinte2, marginTop: 22 }}>Wie findet man sie, ohne zu raten?</div></Auf>
      </div>
      <div style={{ position: 'absolute', left: x(5) + 40, top: 150 }}>
        <Koord w={950} h={820} x0={-3} x1={6} y0={-6} y1={10} gitterY={2} ticksX={[-2, 2, 4]} ticksY={[-4, 4, 8]}>
          {(abb, s) => {
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
    </Abgang>
  </Grund>
);
