import { interpolate } from 'remotion';
import { Abgang, Auf, Cap, Em, Grund, Lbl, Tex } from '../bausteine/Teile';
import { Schritt } from '../bausteine/Rechenweg';
import { Koord, Kurve, Punkt } from '../bausteine/Graph';
import { C, CQ, FONT, RAND } from '../bausteine/stil';
import { auf, RASTEN, useSchlag } from '../bausteine/zeit';

const f = (t: number) => 0.5 * t * t - 2 * t - 6;
const g = (t: number) => t + 2;
const GR = CQ(2.3);

/** Phasen in Schlägen: Aufgabenblatt, dann Teilaufgaben a bis d. */
const P = { blatt: 0, a: 12, b: 32, c: 56, d: 84, ende: 110 };

const Teil: React.FC<{ a: number; aus: number; buchstabe: string; be: number; text: React.ReactNode }> = ({ a, aus, buchstabe, be, text }) => (
  <div style={{ position: 'absolute', left: RAND, top: CQ(7.5), width: CQ(88) }}>
    <Lbl a={a} aus={aus}>{`Teilaufgabe ${buchstabe} · ${be} BE`}</Lbl>
    <Auf a={a + 0.4} aus={aus} block><div style={{ font: `500 ${CQ(1.75)}px/1.45 ${FONT}`, marginTop: CQ(0.6) }}>{text}</div></Auf>
  </div>
);

const Zeile: React.FC<{ a: number; buchstabe: string; be: number; children: React.ReactNode }> = ({ a, buchstabe, be, children }) => (
  <Auf a={a} aus={P.a - 0.6} block>
    <div style={{ display: 'grid', gridTemplateColumns: `${CQ(3)}px 1fr ${CQ(5)}px`, alignItems: 'baseline', font: `500 ${CQ(1.75)}px/1.45 ${FONT}`, marginTop: CQ(0.8) }}>
      <b>{buchstabe})</b>
      <span>{children}</span>
      <span style={{ font: `700 ${CQ(1.4)}px ${FONT}`, color: C.label, textAlign: 'right' }}>{be} BE</span>
    </div>
  </Auf>
);

/** Beispiel an einer selbst erstellten Aufgabe im Abi-Format (keine Originalaufgabe), vier Teilaufgaben. */
export const S7bAbiAufgabe: React.FC<{ schlaege: number }> = ({ schlaege }) => {
  const s = useSchlag();
  const bh = interpolate(s, [P.d + 2, P.d + 3, P.d + 15, P.d + 17], [2, 2, 2, -10.5], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: RASTEN });
  const zeigeH = s >= P.d + 1;
  return (
    <Grund meta="0.1 · Beispielaufgabe im Abi-Format">
      <Abgang schlaege={schlaege}>
        {/* Aufgabenblatt */}
        {s < P.a && (
          <div style={{ position: 'absolute', left: RAND, top: CQ(9), width: CQ(80) }}>
            <Lbl a={0} aus={P.a - 0.6}>Beispielaufgabe · selbst erstellt im Abi-Format · 12 BE</Lbl>
            <Auf a={0.5} aus={P.a - 0.6} block><div style={{ font: `500 ${CQ(1.75)}px/1.45 ${FONT}`, marginTop: CQ(0.8) }}>Gegeben sind <i>f</i> mit <Tex tex="f(x) = 0{,}5x^2 - 2x - 6" size={CQ(1.9)} /> und <i>g</i> mit <Tex tex="g(x) = x + 2" size={CQ(1.9)} />.</div></Auf>
            <Zeile a={2} buchstabe="a" be={2}><b>Gib</b> die Definitions- und die Wertemenge von <i>f</i> <b>an</b>.</Zeile>
            <Zeile a={3.5} buchstabe="b" be={3}><b>Berechne</b> die Schnittpunkte des Graphen von <i>f</i> mit den Koordinatenachsen.</Zeile>
            <Zeile a={5} buchstabe="c" be={4}><b>Berechne</b> die Koordinaten der Schnittpunkte der Graphen von <i>f</i> und <i>g</i>.</Zeile>
            <Zeile a={6.5} buchstabe="d" be={3}>Die Geraden <Tex tex="h_b(x) = x + b" size={CQ(1.9)} /> sind parallel zu <i>g</i>. <b>Bestimme</b> <i>b</i> so, dass <Tex tex="h_b" size={CQ(1.9)} /> den Graphen von <i>f</i> berührt.</Zeile>
          </div>
        )}

        {/* a */}
        {s >= P.a && s < P.b && (
          <>
            <Teil a={P.a} aus={P.b - 0.6} buchstabe="a" be={2} text={<><b>Gib</b> die Definitions- und die Wertemenge von <i>f</i> <b>an</b>.</>} />
            <div style={{ position: 'absolute', left: RAND, top: CQ(17) }}>
              <Schritt n={1} a={P.a + 2} aus={P.b - 0.6} tex="D = \mathbb{R}" size={GR} />
              <Schritt n={2} a={P.a + 5} aus={P.b - 0.6} tex="x_S = -\tfrac{-2}{2 \cdot 0{,}5} = 2" size={GR} grau={P.a + 9} />
              <Schritt n={3} a={P.a + 9} aus={P.b - 0.6} tex="f(2) = 2 - 4 - 6 = -8" size={GR} grau={P.a + 13} />
              <Schritt n={4} a={P.a + 13} aus={P.b - 0.6} tex="W = \{\, y \mid y \geq -8 \,\}" size={GR} fach />
            </div>
          </>
        )}

        {/* b */}
        {s >= P.b && s < P.c && (
          <>
            <Teil a={P.b} aus={P.c - 0.6} buchstabe="b" be={3} text={<><b>Berechne</b> die Schnittpunkte des Graphen von <i>f</i> mit den Koordinatenachsen.</>} />
            <div style={{ position: 'absolute', left: RAND, top: CQ(17) }}>
              <Schritt n={1} a={P.b + 2} aus={P.c - 0.6} tex="f(0) = -6 \;\Rightarrow\; S_y(0 \mid -6)" size={GR} grau={P.b + 6} />
              <Schritt n={2} a={P.b + 6} aus={P.c - 0.6} tex="0{,}5x^2 - 2x - 6 = 0 \quad \mid \cdot 2" size={GR} grau={P.b + 10} />
              <Schritt n={3} a={P.b + 10} aus={P.c - 0.6} tex="x^2 - 4x - 12 = 0" size={GR} grau={P.b + 14} />
              <Schritt n={4} a={P.b + 14} aus={P.c - 0.6} tex="x_{1,2} = 2 \pm \sqrt{4 + 12} = 2 \pm 4" size={GR} grau={P.b + 18} />
              <Schritt n={5} a={P.b + 18} aus={P.c - 0.6} tex="N_1(-2 \mid 0), \quad N_2(6 \mid 0)" size={GR} fach />
            </div>
          </>
        )}

        {/* c */}
        {s >= P.c && s < P.d && (
          <>
            <Teil a={P.c} aus={P.d - 0.6} buchstabe="c" be={4} text={<><b>Berechne</b> die Koordinaten der Schnittpunkte der Graphen von <i>f</i> und <i>g</i>.</>} />
            <div style={{ position: 'absolute', left: RAND, top: CQ(17) }}>
              <Schritt n={1} a={P.c + 2} aus={P.d - 0.6} tex="0{,}5x^2 - 2x - 6 = x + 2" size={GR} grau={P.c + 6} />
              <Schritt n={2} a={P.c + 6} aus={P.d - 0.6} tex="x^2 - 6x - 16 = 0" size={GR} grau={P.c + 11} />
              <Schritt n={3} a={P.c + 11} aus={P.d - 0.6} tex="x_{1,2} = 3 \pm \sqrt{9 + 16} = 3 \pm 5" size={GR} grau={P.c + 16} />
              <Schritt n={4} a={P.c + 16} aus={P.d - 0.6} tex="g(-2) = 0, \quad g(8) = 10" size={GR} grau={P.c + 20} />
              <Schritt n={5} a={P.c + 20} aus={P.d - 0.6} tex="S_1(-2 \mid 0), \quad S_2(8 \mid 10)" size={GR} fach />
            </div>
          </>
        )}

        {/* d */}
        {s >= P.d && (
          <>
            <Teil a={P.d} aus={schlaege} buchstabe="d" be={3} text={<><b>Bestimme</b> <i>b</i> so, dass <Tex tex="h_b(x) = x + b" size={CQ(1.9)} /> den Graphen von <i>f</i> berührt.</>} />
            <div style={{ position: 'absolute', left: RAND, top: CQ(17) }}>
              <Schritt n={1} a={P.d + 2} tex="0{,}5x^2 - 2x - 6 = x + b" size={GR} grau={P.d + 6} />
              <Schritt n={2} a={P.d + 6} tex="x^2 - 6x - 12 - 2b = 0" size={GR} grau={P.d + 10} />
              <Schritt n={3} a={P.d + 10} tex="x_{1,2} = 3 \pm \sqrt{21 + 2b}" size={GR} grau={P.d + 15} />
              <Schritt n={4} a={P.d + 15} tex="21 + 2b = 0 \iff b = -10{,}5" size={GR} grau={P.d + 19} />
              <Schritt n={5} a={P.d + 19} tex="B(3 \mid -7{,}5)" size={GR} fach />
            </div>
          </>
        )}

        {/* Graph, wächst mit den Teilaufgaben */}
        {s >= P.a && (
          <div style={{ position: 'absolute', left: CQ(61), top: CQ(16) }}>
            <Koord w={CQ(34)} h={CQ(32)} x0={-4} x1={10} y0={-10} y1={12} a={P.a} gitterY={2} ticksX={[-2, 2, 4, 6, 8]} ticksY={[-8, -4, 4, 8]}>
              {(abb) => (
                <>
                  <Kurve abb={abb} f={f} von={-4} bis={10} a={P.a + 1} dauer={2} farbe={C.tinte} breite={4} />
                  <Punkt abb={abb} x={2} y={-8} a={P.a + 13} r={11} ring label="S(2 | −8)" labelDx={s < P.d ? 16 : -130} labelDy={34} farbe={s < P.b ? C.fach : C.tinte} />
                  <Punkt abb={abb} x={0} y={-6} a={P.b + 3} r={11} ring label="Sᵧ" labelDx={-46} labelDy={6} farbe={C.tinte} />
                  <Punkt abb={abb} x={-2} y={0} a={P.b + 18.5} r={11} ring label="N₁" labelDx={-44} labelDy={-14} farbe={s < P.c ? C.fach : C.tinte} />
                  <Punkt abb={abb} x={6} y={0} a={P.b + 19} r={11} ring label="N₂" labelDx={12} labelDy={-14} farbe={s < P.c ? C.fach : C.tinte} />
                  <Kurve abb={abb} f={g} von={-4} bis={10} a={P.c + 1} dauer={0.6} farbe={s < P.d ? C.fach : C.grau} breite={s < P.d ? 5 : 3} />
                  <Punkt abb={abb} x={8} y={10} a={P.c + 20.5} r={11} ring label="S₂" labelDx={-44} labelDy={-8} farbe={s < P.d ? C.fach : C.tinte} />
                  {zeigeH && (
                    <path d={`M${abb.sx(-4)} ${abb.sy(-4 + bh)} L${abb.sx(10)} ${abb.sy(10 + bh)}`} stroke={C.fach} strokeWidth={5} opacity={auf(s, P.d + 1, 0.5)} />
                  )}
                  <Punkt abb={abb} x={3} y={-7.5} a={P.d + 19.5} r={12} ring label="B(3 | −7,5)" labelDx={18} labelDy={-16} />
                </>
              )}
            </Koord>
          </div>
        )}

        <Cap rechts={CQ(42)} saetze={[
          { a: 8, aus: P.a - 0.6, lead: 'Vier Teile, ein Thema', text: <>Jede Teilaufgabe nutzt ein Werkzeug aus <Em>dieser Lektion</Em>.</> },
          { a: P.a + 6, aus: P.a + 12.5, lead: 'Scheitel', text: <>Bei nach oben offener Parabel ist der Scheitel der <Em>tiefste Punkt</Em>.</> },
          { a: P.b + 7, aus: P.b + 13.5, lead: 'Erst normieren', text: <>Vor <i>x</i>² muss eine <Em>1</Em> stehen, also mal 2.</> },
          { a: P.c + 21, aus: P.d - 0.6, lead: 'Deutung', text: <><Em>S₁</Em> ist zugleich die Nullstelle N₁ aus Teil b.</> },
          { a: P.d + 11, aus: P.d + 18.5, lead: 'Berühren', text: <>Genau ein Punkt heißt: <Em>null</Em> unter der Wurzel.</> },
          { a: P.d + 20, aus: schlaege, lead: 'Antwortsatz', text: <>Für <Em>b = −10,5</Em> berührt die Gerade in <Em>B(3 | −7,5)</Em>.</> },
        ]} />
      </Abgang>
    </Grund>
  );
};
