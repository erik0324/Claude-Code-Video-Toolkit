import { Abgang, Auf, Grund, Tex } from '../bausteine/Teile';
import { C, FONT, RAND } from '../bausteine/stil';
import { auf, useSchlag, zeichne } from '../bausteine/zeit';

/** Fehlerfalle: ohne Rot. Der falsche Weg wird durchgeschnitten und grau, der richtige kommt in Fachfarbe. */
export const S6Fehlerfalle: React.FC<{ schlaege: number }> = ({ schlaege }) => {
  const s = useSchlag();
  const grau = auf(s, 6.4, 0.5);
  const schnitt = zeichne(s, 6, 0.35);
  return (
    <Grund>
      <Abgang schlaege={schlaege}>
        <div style={{ position: 'absolute', left: RAND, top: 150 }}>
          <Auf a={0}><div style={{ font: `700 22px ${FONT}`, letterSpacing: '0.08em', textTransform: 'uppercase', color: C.tinte2, border: `2px solid ${C.tinte2}`, borderRadius: 999, padding: '8px 20px' }}>Fehlerfalle</div></Auf>
        </div>
        <div style={{ position: 'absolute', left: RAND, top: 330, display: 'flex', alignItems: 'center', gap: 40 }}>
          <Auf a={1}><Tex tex="2x^2 - 4x - 6 = 0" size={92} color={grau > 0.5 ? C.grau : C.tinte} /></Auf>
          <Auf a={3}><div style={{ font: `600 46px ${FONT}`, color: grau > 0.5 ? C.grau : C.tinte2 }}>→ pq-Formel direkt</div></Auf>
          <svg style={{ position: 'absolute', left: -20, top: 0, overflow: 'visible' }} width={1500} height={140}>
            {schnitt > 0 && <line x1={0} y1={96} x2={1500 * schnitt} y2={40} stroke={C.tinte} strokeWidth={6} strokeLinecap="round" />}
          </svg>
        </div>
        <div style={{ position: 'absolute', left: RAND, top: 560 }}>
          <Auf a={9} block><div style={{ font: `700 40px ${FONT}`, color: C.tinte }}>Erst durch 2 teilen:</div></Auf>
          <Auf a={10.5} block><Tex tex="x^2 - 2x - 3 = 0" size={92} color={C.fach} /></Auf>
          <Auf a={14} block><div style={{ font: `500 34px ${FONT}`, color: C.tinte2, marginTop: 24 }}>Die pq-Formel gilt nur, wenn vor <i>x</i>² eine 1 steht.</div></Auf>
        </div>
      </Abgang>
    </Grund>
  );
};
