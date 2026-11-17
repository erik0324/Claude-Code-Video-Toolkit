import { Abgang, Auf, Grund, Kopf, Tex } from '../bausteine/Teile';
import { Koord, Kurve, Punkt } from '../bausteine/Graph';
import { C, FONT, RAND, x } from '../bausteine/stil';
import { auf, useSchlag, zeichne } from '../bausteine/zeit';

const h = (t: number) => -0.05 * t * t + t + 2;
const LANDUNG = 10 + Math.sqrt(140); // ≈ 21,83

const Ergebnis: React.FC<{ a: number; frage: string; tex: string; size?: number }> = ({ a, frage, tex, size = 46 }) => (
  <div style={{ marginBottom: 28 }}>
    <Auf a={a} block><div style={{ font: `600 24px ${FONT}`, color: C.tinte2, letterSpacing: '0.04em', textTransform: 'uppercase' }}>{frage}</div></Auf>
    <Auf a={a + 0.5} block><Tex tex={tex} size={size} /></Auf>
  </div>
);

export const S7Ballwurf: React.FC<{ schlaege: number }> = ({ schlaege }) => {
  const s = useSchlag();
  const flug = zeichne(s, 4, 8);
  const bx = LANDUNG * flug;
  return (
    <Grund>
      <Abgang schlaege={schlaege}>
        <Kopf a={0} zeile="Teil 4 · Modellieren" titel="Ein Ballwurf als Parabel" />
        <div style={{ position: 'absolute', left: RAND, top: 300 }}>
          <Auf a={2}><Tex tex="h(x) = -0{,}05x^2 + x + 2" size={54} /></Auf>
          <Auf a={2.5} block><div style={{ font: `500 26px ${FONT}`, color: C.tinte2, marginTop: 6 }}>x: Entfernung in m · h: Höhe in m</div></Auf>
        </div>
        <div style={{ position: 'absolute', left: x(8) + 30, top: 150, width: 560 }}>
          <Ergebnis a={16} frage="Abwurfhöhe" tex="h(0) = 2\ \text{m}" />
          <Ergebnis a={24} frage="Höchster Punkt" tex="S(10 \mid 7)" />
          <Ergebnis a={32} frage="Aufprall" tex="h(x) = 0 \Rightarrow x \approx 21{,}8\ \text{m}" size={36} />
        </div>
        <div style={{ position: 'absolute', left: RAND - 20, top: 440 }}>
          <Koord w={1280} h={560} x0={-1} x1={24} y0={-1} y1={9} a={0.5} ticksX={[5, 10, 15, 20]} ticksY={[2, 4, 6, 8]} achsenNamen={['x', 'h']}>
            {(abb) => {
              const band = auf(s, 42, 0.8);
              return (
                <>
                  <rect x={abb.sx(0)} y={abb.sy(0) - 20} width={(abb.sx(LANDUNG) - abb.sx(0)) * band} height={40} fill={C.fach} opacity={0.18} />
                  <Kurve abb={abb} f={h} von={0} bis={LANDUNG} a={4} dauer={8} farbe={C.fach} />
                  {flug > 0 && flug < 1 && <circle cx={abb.sx(bx)} cy={abb.sy(h(bx))} r={16} fill={C.tinte} />}
                  <Punkt abb={abb} x={0} y={2} a={16.5} farbe={C.tinte} r={12} ring />
                  <Punkt abb={abb} x={10} y={7} a={24.5} farbe={C.tinte} r={12} ring />
                  <Punkt abb={abb} x={LANDUNG} y={0} a={32.5} farbe={C.tinte} r={12} ring />
                </>
              );
            }}
          </Koord>
        </div>
        <div style={{ position: 'absolute', left: x(8) + 30, top: 700, width: 600 }}>
          <Auf a={42.5} block><div style={{ font: `700 22px ${FONT}`, letterSpacing: '0.07em', textTransform: 'uppercase', color: C.fachText }}>Im Sachzusammenhang</div></Auf>
          <Auf a={43} block><Tex tex="D = \{\, x \mid 0 \leq x \leq 21{,}8 \,\}" size={42} /></Auf>
          <Auf a={46} block><Tex tex="W = \{\, h \mid 0 \leq h \leq 7 \,\}" size={42} /></Auf>
        </div>
      </Abgang>
    </Grund>
  );
};
