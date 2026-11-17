import { Abgang, Auf, Cap, Em, Grund, Lbl, Tex } from '../bausteine/Teile';
import { Schritt } from '../bausteine/Rechenweg';
import { Koord, Kurve, Punkt } from '../bausteine/Graph';
import { C, CQ, FONT, RAND } from '../bausteine/stil';
import { useSchlag } from '../bausteine/zeit';

const f = (t: number) => t * t - 4 * t + 1;
const g = (t: number) => 2 * t - 4;
const GR = CQ(2.4);

/** Beispiel an einer selbst erstellten Aufgabe im Abi-Format (keine Originalaufgabe). */
export const S7bAbiAufgabe: React.FC<{ schlaege: number }> = ({ schlaege }) => {
  const s = useSchlag();
  return (
    <Grund meta="0.1 · Beispielaufgabe im Abi-Format">
      <Abgang schlaege={schlaege}>
        <div style={{ position: 'absolute', left: RAND, top: CQ(7.5), width: CQ(88) }}>
          <Lbl a={0}>Beispielaufgabe · selbst erstellt im Abi-Format</Lbl>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', gap: CQ(2), marginTop: CQ(0.8) }}>
            <div style={{ font: `500 ${CQ(1.75)}px/1.5 ${FONT}` }}>
              <Auf a={0.5} block>Gegeben sind <i>f</i> mit <Tex tex="f(x) = x^2 - 4x + 1" size={CQ(1.9)} /> und <i>g</i> mit <Tex tex="g(x) = 2x - 4" size={CQ(1.9)} />.</Auf>
              <Auf a={2} block><b style={{ color: C.fach }}>Berechne</b> die Koordinaten der Schnittpunkte der Graphen von <i>f</i> und <i>g</i>.</Auf>
            </div>
            <Auf a={2.5}><span style={{ font: `700 ${CQ(1.6)}px ${FONT}`, color: C.label, whiteSpace: 'nowrap' }}>3 BE</span></Auf>
          </div>
        </div>
        <div style={{ position: 'absolute', left: RAND, top: CQ(19) }}>
          <Schritt n={1} a={8} tex="f(x) = g(x) \iff x^2 - 4x + 1 = 2x - 4" size={GR} grau={14} />
          <Schritt n={2} a={14} tex="x^2 - 6x + 5 = 0" size={GR} grau={20} />
          <Schritt n={3} a={20} tex="x_{1,2} = 3 \pm \sqrt{9 - 5} = 3 \pm 2" size={GR} grau={27} />
          <Schritt n={4} a={27} tex="x_1 = 1, \quad x_2 = 5" size={GR} grau={33} />
          <Schritt n={5} a={33} tex="g(1) = -2, \quad g(5) = 6" size={GR} grau={39} />
          <Schritt n={6} a={39} tex="S_1(1 \mid -2), \quad S_2(5 \mid 6)" size={GR} fach />
        </div>
        <div style={{ position: 'absolute', left: CQ(62), top: CQ(18.5) }}>
          <Koord w={CQ(33)} h={CQ(30)} x0={-1} x1={7} y0={-4} y1={9} a={3} gitterY={2} ticksX={[2, 4, 6]} ticksY={[-2, 2, 4, 6]}>
            {(abb) => (
              <>
                <Kurve abb={abb} f={f} von={-0.8} bis={4.9} a={4} dauer={2} farbe={C.tinte} breite={4} />
                <Kurve abb={abb} f={f} von={4.9} bis={6.9} a={6} dauer={0.6} farbe={C.tinte} breite={4} />
                <Kurve abb={abb} f={g} von={-1} bis={7} a={6} dauer={0.6} farbe={C.fach} />
                <Punkt abb={abb} x={1} y={-2} a={39.5} r={12} ring label="S₁" labelDx={-40} labelDy={30} farbe={C.tinte} />
                <Punkt abb={abb} x={5} y={6} a={40} r={12} ring label="S₂" labelDx={-46} labelDy={-10} farbe={C.tinte} />
              </>
            )}
          </Koord>
        </div>
        <Cap rechts={CQ(40)} saetze={[
          { a: 8.5, aus: 19.5, lead: 'Ansatz', text: <>Erst den Ansatz notieren: <Em>gleichsetzen</Em>.</> },
          { a: 20.5, aus: 32.5, lead: 'Berechne', text: <>Ohne die erweiterten Rechnerfunktionen, also <Em>von Hand</Em>.</> },
          { a: 33.5, aus: 43.5, text: <>Die y-Werte kommen aus der <Em>einfacheren</Em> Funktion.</> },
          { a: 44, aus: schlaege, lead: 'Antwortsatz', text: <>Die Graphen schneiden sich in <Em>S₁(1 | −2)</Em> und <Em>S₂(5 | 6)</Em>.</> },
        ]} />
      </Abgang>
    </Grund>
  );
};
