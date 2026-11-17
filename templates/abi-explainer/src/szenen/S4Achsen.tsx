import { Abgang, Auf, Cap, Em, Grund, Kopf, Lbl, Tex } from '../bausteine/Teile';
import { Schritt } from '../bausteine/Rechenweg';
import { Koord, Kurve, Punkt } from '../bausteine/Graph';
import { C, CQ, FONT, RAND } from '../bausteine/stil';
import { useSchlag } from '../bausteine/zeit';

const f = (t: number) => t * t - 2 * t - 3;

export const S4Achsen: React.FC<{ schlaege: number }> = ({ schlaege }) => {
  const s = useSchlag();
  return (
    <Grund meta="0.1 · Teil 2 · Achsenschnittpunkte">
      <Abgang schlaege={schlaege}>
        <Kopf a={0} zeile="Teil 2 · Besondere Punkte" titel="Wo der Graph die Achsen schneidet" aus={15.5} />
        {/* A: Merksatz und y-Achse (0–16) */}
        {s < 16 && (
          <div style={{ position: 'absolute', left: RAND, top: CQ(19), width: CQ(50) }}>
            <Lbl a={2} aus={15.5}>Merksatz · y-Achse</Lbl>
            <Auf a={3} aus={15.5} block><div style={{ font: `500 ${CQ(2.2)}px/1.4 ${FONT}`, marginTop: CQ(0.8) }}><Tex tex="x = 0" size={CQ(2.4)} /> einsetzen</div></Auf>
            <div style={{ height: CQ(2) }} />
            <Lbl a={5} aus={15.5}>Merksatz · x-Achse (Nullstellen)</Lbl>
            <Auf a={6} aus={15.5} block><div style={{ font: `500 ${CQ(2.2)}px/1.4 ${FONT}`, marginTop: CQ(0.8) }}><Tex tex="f(x) = 0" size={CQ(2.4)} /> lösen</div></Auf>
          </div>
        )}
        {/* B: Rechenweg pq-Formel (16–48) */}
        {s >= 16 && s < 48.5 && (
          <div style={{ position: 'absolute', left: RAND, top: CQ(9) }}>
            <Schritt n={1} a={17} aus={48} tex="x^2 - 2x - 3 = 0" />
            <Schritt n={2} a={21} aus={48} tex="p = -2, \quad q = -3" grau={32} />
            <Schritt n={3} a={26} aus={48} tex="x_{1,2} = -\tfrac{p}{2} \pm \sqrt{\left(\tfrac{p}{2}\right)^2 - q}" grau={32} />
            <Schritt n={4} a={32} aus={48} tex="x_{1,2} = 1 \pm \sqrt{1 + 3}" grau={37} />
            <Schritt n={5} a={37} aus={48} tex="x_{1,2} = 1 \pm 2" grau={42} />
            <Schritt n={6} a={42} aus={48} tex="x_1 = -1, \quad x_2 = 3" fach />
          </div>
        )}
        {/* C: zweiter Weg (49–80) */}
        {s >= 48.5 && (
          <div style={{ position: 'absolute', left: RAND, top: CQ(9), width: CQ(52) }}>
            <Lbl a={49}>Weg 2 · Faktorisieren</Lbl>
            <Auf a={50} block><Tex tex="x^2 - 2x - 3 = (x + 1)(x - 3)" size={CQ(2.9)} /></Auf>
            <Auf a={54} block><div style={{ font: `500 ${CQ(1.8)}px/1.45 ${FONT}`, marginTop: CQ(1) }}>Ein Produkt ist null, wenn ein Faktor null ist.</div></Auf>
            <Auf a={58} block><div style={{ font: `500 ${CQ(1.8)}px/1.45 ${FONT}`, color: C.tinte2 }}>Schneller, klappt aber nur bei „schönen“ Zahlen.</div></Auf>
            <div style={{ height: CQ(3) }} />
            <Lbl a={64}>Nullstellen</Lbl>
            <Auf a={64.4} block><Tex tex="N_1(-1 \mid 0), \quad N_2(3 \mid 0)" size={CQ(3)} color={C.fach} /></Auf>
          </div>
        )}
        <div style={{ position: 'absolute', left: CQ(60), top: CQ(9) }}>
          <Koord w={CQ(35)} h={CQ(38)} x0={-3} x1={5} y0={-5} y1={6} a={0.5} ticksX={[-2, 2, 4]} ticksY={[-4, 4]}>
            {(abb) => (
              <>
                <Kurve abb={abb} f={f} von={-2.3} bis={4.3} a={1} dauer={2} farbe={s >= 9 ? C.grau : C.fach} breite={4} />
                <Punkt abb={abb} x={0} y={-3} a={9} r={12} ring label="Sᵧ(0 | −3)" labelDx={20} labelDy={8} farbe={s >= 43 ? C.tinte : C.fach} />
                <Punkt abb={abb} x={-1} y={0} a={43} r={13} ring label="N₁" labelDx={-46} labelDy={-18} />
                <Punkt abb={abb} x={3} y={0} a={43.5} r={13} ring label="N₂" labelDx={14} labelDy={-18} />
              </>
            )}
          </Koord>
        </div>
        <Cap rechts={CQ(42)} saetze={[
          { a: 9, aus: 15.5, lead: 'y-Achse', text: <><Tex tex="f(0) = -3" size={CQ(2.3)} />, also <Em>Sᵧ(0 | −3)</Em></> },
          { a: 18, aus: 25.5, text: <>Normalform: vor <i>x</i>² steht eine <Em>1</Em>.</> },
          { a: 26.5, aus: 41.5, lead: 'pq-Formel', text: <>Einsetzen und <Em>zusammenfassen</Em>.</> },
          { a: 43, aus: 48, text: <>Zwei <Em>Nullstellen</Em>.</> },
          { a: 66, aus: schlaege, text: <>Gleiches Ergebnis, <Em>zwei Wege</Em>.</> },
        ]} />
      </Abgang>
    </Grund>
  );
};
