import { Abgang, Auf, Grund, Karte, Kopf, Tex, Wisch } from '../bausteine/Teile';
import { Schritt } from '../bausteine/Rechenweg';
import { Koord, Kurve, Punkt } from '../bausteine/Graph';
import { C, FONT, RAND, breite, x } from '../bausteine/stil';
import { useSchlag } from '../bausteine/zeit';

const f = (t: number) => t * t - 2 * t - 3;

export const S4Achsen: React.FC<{ schlaege: number }> = ({ schlaege }) => {
  const s = useSchlag();
  return (
    <Grund>
      <Abgang schlaege={schlaege}>
        <Kopf a={0} zeile="Teil 2 · Besondere Punkte" titel="Wo der Graph die Achsen schneidet" />
        {/* A: Merksatz und y-Achse (0–16) */}
        {s < 16.5 && (
          <div style={{ position: 'absolute', left: RAND, top: 360, width: breite(7) }}>
            <Wisch a={2} aus={15.5}>
              <Karte art="merksatz" titel="Merksatz: Achsenschnittpunkte">
                <Auf a={3} block><div style={{ font: `500 36px/1.5 ${FONT}` }}><b>y-Achse:</b> <Tex tex="x = 0" size={38} /> einsetzen</div></Auf>
                <Auf a={5} block><div style={{ font: `500 36px/1.5 ${FONT}`, marginTop: 8 }}><b>x-Achse (Nullstellen):</b> <Tex tex="f(x) = 0" size={38} /> lösen</div></Auf>
              </Karte>
            </Wisch>
            <div style={{ height: 40 }} />
            <Auf a={9} aus={15.5} block><Tex tex="f(0) = -3 \;\Rightarrow\; S_y(0 \mid -3)" size={50} /></Auf>
          </div>
        )}
        {/* B: Rechenweg pq-Formel (16–48) */}
        {s >= 16 && s < 49 && (
          <div style={{ position: 'absolute', left: RAND, top: 340 }}>
            <Schritt n={1} a={17} aus={48} tex="x^2 - 2x - 3 = 0" notiz="Normalform" />
            <Schritt n={2} a={21} aus={48} tex="p = -2, \quad q = -3" />
            <Schritt n={3} a={26} aus={48} tex="x_{1,2} = -\tfrac{p}{2} \pm \sqrt{\left(\tfrac{p}{2}\right)^2 - q}" notiz="pq-Formel" />
            <Schritt n={4} a={32} aus={48} tex="x_{1,2} = 1 \pm \sqrt{1 + 3}" />
            <Schritt n={5} a={37} aus={48} tex="x_{1,2} = 1 \pm 2" />
            <Schritt n={6} a={42} aus={48} tex="x_1 = -1, \quad x_2 = 3" fach />
          </div>
        )}
        {/* C: zweiter Weg (49–80) */}
        {s >= 48.5 && (
          <div style={{ position: 'absolute', left: RAND, top: 360, width: breite(7) }}>
            <Wisch a={49}>
              <Karte art="neutral" titel="Weg 2: Faktorisieren">
                <Auf a={50} block><Tex tex="x^2 - 2x - 3 = (x + 1)(x - 3) = 0" size={50} /></Auf>
                <Auf a={54} block><div style={{ font: `500 32px/1.5 ${FONT}`, marginTop: 16 }}>Ein Produkt ist null, wenn ein Faktor null ist.</div></Auf>
                <Auf a={58} block><div style={{ font: `500 32px/1.5 ${FONT}`, color: C.tinte2 }}>Schneller, klappt aber nur bei „schönen“ Zahlen.</div></Auf>
              </Karte>
            </Wisch>
            <div style={{ height: 40 }} />
            <Auf a={64} block><Tex tex="N_1(-1 \mid 0), \quad N_2(3 \mid 0)" size={52} color={C.fach} /></Auf>
          </div>
        )}
        <div style={{ position: 'absolute', left: x(7), top: 250 }}>
          <Koord w={706} h={740} x0={-3} x1={5} y0={-5} y1={6} a={0.5} ticksX={[-2, 2, 4]} ticksY={[-4, 4]}>
            {(abb) => (
              <>
                <Kurve abb={abb} f={f} von={-2.3} bis={4.3} a={1} dauer={2} farbe={s >= 9 ? C.tinte2 : C.fach} breite={4} />
                <Punkt abb={abb} x={0} y={-3} a={9} r={12} ring label="Sᵧ(0 | −3)" labelDx={20} labelDy={8} farbe={C.fach} />
                <Punkt abb={abb} x={-1} y={0} a={43} r={13} ring label="N₁" labelDx={-46} labelDy={-18} />
                <Punkt abb={abb} x={3} y={0} a={43.5} r={13} ring label="N₂" labelDx={14} labelDy={-18} />
              </>
            )}
          </Koord>
        </div>
      </Abgang>
    </Grund>
  );
};
