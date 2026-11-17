import { Abgang, Auf, Grund, Lbl } from '../bausteine/Teile';
import { C, CQ, FONT } from '../bausteine/stil';
import { auf, useSchlag } from '../bausteine/zeit';

/** Abi-Karte nach Video-Stil (.abi): Fachfarbe wischt als halbe Seite herein. */
export const S7cAbiKarte: React.FC<{ schlaege: number }> = ({ schlaege }) => {
  const s = useSchlag();
  const wisch = auf(s, 0, 0.6);
  return (
    <Grund meta="Im Abi">
      <Abgang schlaege={schlaege}>
        <div style={{ position: 'absolute', inset: 0, display: 'grid', gridTemplateColumns: '1fr 1fr' }}>
          <div style={{ background: C.fach, color: '#fff', position: 'relative', padding: `${CQ(9)}px ${CQ(4)}px ${CQ(4)}px ${CQ(5)}px`, clipPath: `inset(0 ${(1 - wisch) * 100}% 0 0)` }}>
            <div style={{ position: 'absolute', left: CQ(5), top: CQ(3.6), display: 'flex', alignItems: 'center', gap: CQ(1.4), font: `600 ${CQ(1.15)}px/1 ${FONT}`, letterSpacing: '0.08em', textTransform: 'uppercase', opacity: 0.85 }}>
              <div style={{ width: CQ(1.6), height: CQ(1.6), borderRadius: CQ(0.35), background: '#fff', color: C.fach, display: 'grid', placeItems: 'center', font: `800 ${CQ(0.95)}px ${FONT}`, letterSpacing: 0 }}>M</div>
              Im Abi
            </div>
            <Auf a={0.6} block><div style={{ font: `900 ${CQ(7.8)}px/0.95 ${FONT}`, letterSpacing: '-0.04em' }}>Berechne</div></Auf>
            <div style={{ position: 'absolute', left: CQ(5), bottom: CQ(4) }}>
              <Auf a={1.4}><span style={{ font: `700 ${CQ(2)}px ${FONT}` }}>Teil c · 4 BE · AFB II</span></Auf>
            </div>
          </div>
          <div style={{ padding: `${CQ(9)}px ${CQ(5)}px ${CQ(4)}px ${CQ(4)}px`, font: `500 ${CQ(1.9)}px/1.45 ${FONT}` }}>
            <Lbl a={2}>Operator</Lbl>
            <Auf a={2.5} block><div style={{ marginTop: CQ(0.8) }}>„Berechne“ heißt in Hessen: durch Rechenoperationen zum Ergebnis, <b>ohne</b> die erweiterten Funktionen von WTR oder CAS.</div></Auf>
            <Auf a={6} block><div style={{ marginTop: CQ(1), color: C.tinte2 }}>Bei „Bestimme“ dürfen sie genutzt werden.</div></Auf>
            <div style={{ height: CQ(3) }} />
            <Lbl a={10}>Im E-Book</Lbl>
            <Auf a={10.5} block><div style={{ marginTop: CQ(0.8) }}>Ü 0.1.5 bis 0.1.8 · die ganze Aufgabe zum Üben</div></Auf>
          </div>
        </div>
      </Abgang>
    </Grund>
  );
};
