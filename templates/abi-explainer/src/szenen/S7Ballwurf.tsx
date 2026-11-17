import { Abgang, Auf, Cap, Em, Grund, Kopf, Lbl, Tex } from '../bausteine/Teile';
import { Koord, Kurve, Punkt } from '../bausteine/Graph';
import { C, CQ, FONT, RAND } from '../bausteine/stil';
import { auf, useSchlag, zeichne } from '../bausteine/zeit';

const h = (t: number) => -0.05 * t * t + t + 2;
const LANDUNG = 10 + Math.sqrt(140); // ≈ 21,83

const Ablesung: React.FC<{ a: number; frage: string; tex: string }> = ({ a, frage, tex }) => (
  <div style={{ marginBottom: CQ(1.6) }}>
    <Lbl a={a}>{frage}</Lbl>
    <Auf a={a + 0.4} block><div style={{ marginTop: CQ(0.4) }}><Tex tex={tex} size={CQ(2.6)} /></div></Auf>
  </div>
);

export const S7Ballwurf: React.FC<{ schlaege: number }> = ({ schlaege }) => {
  const s = useSchlag();
  const flug = zeichne(s, 4, 8);
  const bx = LANDUNG * flug;
  return (
    <Grund meta="0.1 · Teil 4 · Modellieren">
      <Abgang schlaege={schlaege}>
        <Kopf a={0} zeile="Teil 4 · Modellieren" titel="Ein Ballwurf als Parabel" breite={CQ(56)} />
        <div style={{ position: 'absolute', left: RAND, top: CQ(17.5) }}>
          <Auf a={2}><Tex tex="h(x) = -0{,}05x^2 + x + 2" size={CQ(2.9)} /></Auf>
          <Auf a={2.5} block><div style={{ font: `500 ${CQ(1.35)}px ${FONT}`, color: C.tinte2, marginTop: 4 }}>x: Entfernung in m · h: Höhe in m</div></Auf>
        </div>
        <div style={{ position: 'absolute', left: CQ(69), top: CQ(7.5), width: CQ(26) }}>
          <Ablesung a={16} frage="Abwurfhöhe" tex="h(0) = 2\ \text{m}" />
          <Ablesung a={24} frage="Höchster Punkt" tex="S(10 \mid 7)" />
          <Ablesung a={32} frage="Aufprall · h(x) = 0" tex="x \approx 21{,}8\ \text{m}" />
          <Ablesung a={42} frage="Definitionsmenge im Sachzusammenhang" tex="0 \leq x \leq 21{,}8" />
        </div>
        <div style={{ position: 'absolute', left: RAND - 20, top: CQ(24) }}>
          <Koord w={CQ(64)} h={CQ(24.5)} x0={-1} x1={24} y0={-1} y1={9} a={0.5} ticksX={[5, 10, 15, 20]} ticksY={[2, 4, 6, 8]} achsenNamen={['x', 'h']}>
            {(abb) => {
              const band = auf(s, 42, 0.8);
              return (
                <>
                  {band > 0 && <rect x={abb.sx(0)} y={abb.sy(0) - 20} width={(abb.sx(LANDUNG) - abb.sx(0)) * band} height={40} fill={C.fach} opacity={0.18} />}
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
        <Cap rechts={CQ(34)} saetze={[
          { a: 4, aus: 15.5, text: <>Funktionen beschreiben auch <Em>echte Situationen</Em>.</> },
          { a: 44, aus: schlaege, text: <>Sinnvoll ist nur der <Em>Flug</Em>.</> },
        ]} />
      </Abgang>
    </Grund>
  );
};
