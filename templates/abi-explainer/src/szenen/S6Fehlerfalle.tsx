import { Abgang, Auf, Cap, Em, Grund, Tex } from '../bausteine/Teile';
import { C, CQ, FONT } from '../bausteine/stil';
import { auf, useSchlag } from '../bausteine/zeit';

const K: React.FC<{ children: React.ReactNode; a: number; style?: React.CSSProperties }> = ({ children, a, style }) => (
  <Auf a={a} block style={style}><div style={{ font: `600 ${CQ(1.3)}px ${FONT}`, letterSpacing: '0.08em', textTransform: 'uppercase', color: C.label }}>{children}</div></Auf>
);

/** Fehlerfalle mit Messerschnitt (Video-Stil .trap): kein Rot. Der falsche Weg wird durchgeschnitten und grau. */
export const S6Fehlerfalle: React.FC<{ schlaege: number }> = ({ schlaege }) => {
  const s = useSchlag();
  const messer = auf(s, 6, 0.4);
  const blass = auf(s, 6.6, 0.5);
  return (
    <Grund meta="Typische Fehlerquelle">
      <Abgang schlaege={schlaege}>
        <div style={{ position: 'absolute', left: CQ(5), top: CQ(12), right: CQ(5) }}>
          <K a={0}>So nicht</K>
          <div style={{ opacity: 1 - 0.72 * blass, marginTop: CQ(1.4) }}>
            <div style={{ position: 'relative', display: 'inline-block' }}>
              <Auf a={1}><Tex tex="2x^2 - 4x - 6 = 0 \;\Rightarrow\; x_{1,2} = 2 \pm \sqrt{4 + 6}" size={CQ(3.8)} style={{ whiteSpace: 'nowrap' }} /></Auf>
              <div style={{ position: 'absolute', left: '-2%', top: '52%', height: CQ(0.35), width: '104%', background: C.tinte, transform: `scaleX(${messer})`, transformOrigin: 'left' }} />
            </div>
          </div>
          <K a={9} style={{ marginTop: CQ(4) }}>Sondern · erst durch 2 teilen</K>
          <div style={{ marginTop: CQ(1.4) }}>
            <Auf a={10.5}><Tex tex="x^2 - 2x - 3 = 0 \;\Rightarrow\; x_{1,2} = 1 \pm 2" size={CQ(3.8)} color={C.fach} style={{ whiteSpace: 'nowrap' }} /></Auf>
          </div>
        </div>
        <Cap rechts={CQ(20)} saetze={[
          { a: 2, aus: 8.5, text: <>Die pq-Formel direkt? Das kostet im Abi <Em>Punkte</Em>.</> },
          { a: 13, aus: schlaege, text: <>Die pq-Formel gilt nur, wenn vor <i>x</i>² eine <Em>1</Em> steht.</> },
        ]} />
      </Abgang>
    </Grund>
  );
};
