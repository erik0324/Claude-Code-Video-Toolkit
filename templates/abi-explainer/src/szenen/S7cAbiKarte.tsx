import { Abgang, Auf, Grund, Lbl } from '../bausteine/Teile';
import { C, CQ, FONT, RAND } from '../bausteine/stil';
import { auf, useSchlag } from '../bausteine/zeit';

/** Operator-Übersicht wie im E-Book (Block abiUebersicht): Teil, Operator mit Bedeutung, was geprüft wird, BE, AFB. */
const ZEILEN = [
  { teil: 'a', op: 'Gib an', bed: 'Ergebnis nennen, ohne Begründung und ohne Rechenweg', inhalt: 'Definitions- und Wertemenge über den Scheitel', be: 2, afb: 'I' },
  { teil: 'b', op: 'Berechne', bed: 'von Hand, ohne die erweiterten Funktionen von WTR oder CAS', inhalt: 'Achsenschnittpunkte, erst normieren, dann pq-Formel', be: 3, afb: 'I' },
  { teil: 'c', op: 'Berechne', bed: 'von Hand, ohne die erweiterten Funktionen von WTR oder CAS', inhalt: 'Gleichsetzen, vollständige Koordinaten, Deutung', be: 4, afb: 'II' },
  { teil: 'd', op: 'Bestimme', bed: 'Lösungsweg darstellen, erweiterte Funktionen erlaubt', inhalt: 'Anzahl der Lösungen über den Ausdruck unter der Wurzel', be: 3, afb: 'III' },
];
const SPALTEN = `${CQ(4)}px ${CQ(30)}px ${CQ(32)}px ${CQ(8)}px ${CQ(8)}px`;

export const S7cAbiKarte: React.FC<{ schlaege: number }> = ({ schlaege }) => {
  const s = useSchlag();
  const kopf = auf(s, 1, 0.6);
  return (
    <Grund meta="Im Abi · Operatoren">
      <Abgang schlaege={schlaege}>
        <div style={{ position: 'absolute', left: RAND, top: CQ(7.5), width: CQ(88) }}>
          <Lbl a={0}>Im Abi · Beispielaufgabe · 12 BE</Lbl>
          <Auf a={0.4} block><div style={{ font: `800 ${CQ(2.9)}px/1.05 ${FONT}`, letterSpacing: '-0.025em', marginTop: CQ(0.4) }}>Auf den Operator kommt es an</div></Auf>
          <div style={{ marginTop: CQ(2.4), display: 'grid', gridTemplateColumns: SPALTEN, columnGap: CQ(2), padding: `${CQ(0.8)}px ${CQ(1.2)}px`, background: C.fachHell, clipPath: `inset(0 ${(1 - kopf) * 100}% 0 0)`, font: `600 ${CQ(1.1)}px ${FONT}`, letterSpacing: '0.07em', textTransform: 'uppercase', color: C.fachText }}>
            <span>Teil</span><span>Operator</span><span>Was geprüft wird</span><span>BE</span><span>AFB</span>
          </div>
          {ZEILEN.map((z, i) => {
            const a = 2 + i * 3;
            const linie = auf(s, a, 0.5);
            return (
              <div key={z.teil} style={{ position: 'relative', display: 'grid', gridTemplateColumns: SPALTEN, columnGap: CQ(2), alignItems: 'center', padding: `${CQ(0.85)}px ${CQ(1.2)}px` }}>
                <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: 1.5, background: C.linie, transform: `scaleX(${linie})`, transformOrigin: 'left' }} />
                <Auf a={a}><div style={{ width: CQ(2.6), height: CQ(2.6), borderRadius: '50%', background: C.fach, color: '#fff', display: 'grid', placeItems: 'center', font: `700 ${CQ(1.3)}px ${FONT}` }}>{z.teil}</div></Auf>
                <div>
                  <Auf a={a + 0.2} block><b style={{ display: 'block', font: `700 ${CQ(1.9)}px ${FONT}`, color: C.fachText }}>{z.op}</b></Auf>
                  <Auf a={a + 0.5} block><span style={{ display: 'block', font: `500 ${CQ(1.2)}px/1.35 ${FONT}`, color: C.tinte2 }}>{z.bed}</span></Auf>
                </div>
                <Auf a={a + 0.8} block><span style={{ font: `500 ${CQ(1.4)}px/1.4 ${FONT}` }}>{z.inhalt}</span></Auf>
                <Auf a={a + 1}><span style={{ font: `800 ${CQ(2.3)}px ${FONT}` }}>{z.be}</span> <span style={{ font: `600 ${CQ(0.9)}px ${FONT}`, color: C.label }}>BE</span></Auf>
                <Auf a={a + 1.1}><span style={{ border: `1.5px solid ${C.linie}`, borderRadius: 999, padding: `${CQ(0.2)}px ${CQ(0.8)}px`, font: `700 ${CQ(1.2)}px ${FONT}` }}><span style={{ font: `600 ${CQ(0.85)}px ${FONT}`, color: C.label }}>AFB</span> {z.afb}</span></Auf>
              </div>
            );
          })}
          <div style={{ position: 'relative', display: 'flex', justifyContent: 'space-between', alignItems: 'baseline', padding: `${CQ(1)}px ${CQ(1.2)}px` }}>
            <div style={{ position: 'absolute', left: 0, right: 0, top: 0, height: CQ(0.12), background: C.tinte, transform: `scaleX(${auf(s, 14.5, 0.5)})`, transformOrigin: 'left' }} />
            <Auf a={15}><span style={{ font: `600 ${CQ(1.15)}px ${FONT}`, letterSpacing: '0.07em', textTransform: 'uppercase', color: C.label }}>Gesamt · im E-Book als Ü 0.1.5 bis 0.1.8 mit Lösungswegen</span></Auf>
            <Auf a={15.3}><span style={{ font: `800 ${CQ(2.3)}px ${FONT}` }}>12</span> <span style={{ font: `600 ${CQ(0.9)}px ${FONT}`, color: C.label }}>BE</span></Auf>
          </div>
        </div>
      </Abgang>
    </Grund>
  );
};
