import { Abgang, Auf, Grund } from '../bausteine/Teile';
import { C, CQ, FONT } from '../bausteine/stil';

/** Kapitelkarte nach Video-Stil (.num / .chap-title): riesige Nummer, kleiner Titel. */
export const S2Karte: React.FC<{ schlaege: number }> = ({ schlaege }) => (
  <Grund meta="Kapitel 0 · Wiederholung Einführungsphase">
    <Abgang schlaege={schlaege}>
      <div style={{ position: 'absolute', left: CQ(4.2), top: CQ(8) }}>
        <Auf a={0}><div style={{ font: `900 ${CQ(34)}px/0.78 ${FONT}`, letterSpacing: '-0.06em', color: C.fach }}>0.1</div></Auf>
      </div>
      <div style={{ position: 'absolute', left: CQ(56), top: CQ(18), width: CQ(38) }}>
        <Auf a={0.5} block><span style={{ font: `600 ${CQ(1.3)}px ${FONT}`, letterSpacing: '0.08em', textTransform: 'uppercase', color: C.label }}>0 · Wiederholung Einführungsphase</span></Auf>
        <Auf a={1} block><div style={{ font: `800 ${CQ(5.6)}px/1.0 ${FONT}`, letterSpacing: '-0.035em', marginTop: CQ(1) }}>Funktionen und ihre Darstellung</div></Auf>
        <Auf a={1.75} block>
          <div style={{ font: `500 ${CQ(1.5)}px/1.45 ${FONT}`, color: C.tinte2, marginTop: CQ(2), borderTop: `${CQ(0.12)}px solid ${C.tinte}`, paddingTop: CQ(1.2) }}>
            Definitions- und Wertemenge, Graph, Achsenschnittpunkte und Schnittpunkte zweier Graphen. GK und LK · E-Book Lektion 0.1
          </div>
        </Auf>
      </div>
    </Abgang>
  </Grund>
);
