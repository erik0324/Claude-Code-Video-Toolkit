import { Abgang, Auf, Grund } from '../bausteine/Teile';
import { C, FONT, x } from '../bausteine/stil';

export const S2Karte: React.FC<{ schlaege: number }> = ({ schlaege }) => (
  <Grund>
    <Abgang schlaege={schlaege}>
      <div style={{ position: 'absolute', left: x(0), top: 300 }}>
        <Auf a={0}><div style={{ font: `800 400px/0.85 ${FONT}`, letterSpacing: '-0.05em', color: C.fach }}>0.1</div></Auf>
      </div>
      <div style={{ position: 'absolute', left: x(6) + 40, top: 470, width: 860 }}>
        <Auf a={0.75} block><div style={{ font: `600 24px ${FONT}`, letterSpacing: '0.08em', textTransform: 'uppercase', color: C.tinte2 }}>Kapitel 0 · Wiederholung Einführungsphase</div></Auf>
        <Auf a={1.25} block><div style={{ font: `800 74px/1.04 ${FONT}`, letterSpacing: '-0.03em', marginTop: 10 }}>Funktionen und ihre Darstellung</div></Auf>
      </div>
    </Abgang>
  </Grund>
);
