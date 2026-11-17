import { Auf, Grund, Kopf, Tex } from '../bausteine/Teile';
import { C, FONT, RAND, breite, x } from '../bausteine/stil';
import { useSchlag } from '../bausteine/zeit';

const Kachel: React.FC<{ a: number; zeile: string; titel: string; text: string; hervor?: boolean; spalte: number }> = ({ a, zeile, titel, text, hervor, spalte }) => (
  <div style={{ position: 'absolute', left: x(spalte), top: 420, width: breite(4) }}>
    <Auf a={a} block>
      <div style={{ height: 360, borderRadius: 22, padding: 40, background: hervor ? C.fachHell : C.blatt, border: hervor ? `3px solid ${C.fach}` : `1px solid ${C.linie}`, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
        <div style={{ font: `700 22px ${FONT}`, letterSpacing: '0.08em', textTransform: 'uppercase', color: hervor ? C.fachText : C.tinte2 }}>{zeile}</div>
        <div>
          <div style={{ font: `800 50px/1.05 ${FONT}`, letterSpacing: '-0.02em' }}>{titel}</div>
          <div style={{ font: `500 28px ${FONT}`, color: C.tinte2, marginTop: 12 }}>{text}</div>
        </div>
      </div>
    </Auf>
  </div>
);

export const S8Abschluss: React.FC<{ schlaege: number }> = () => {
  const s = useSchlag();
  return (
    <Grund>
      <Kopf a={0} zeile="Abschluss" titel="Auf einen Blick" aus={9} />
      {s < 9.5 && (
        <div style={{ position: 'absolute', left: RAND, top: 400 }}>
          <Auf a={2} aus={9} block><div style={{ display: 'flex', gap: 30, alignItems: 'baseline', marginBottom: 30 }}><span style={{ font: `600 40px ${FONT}`, width: 360 }}>Nullstellen</span><Tex tex="f(x) = 0" size={64} /></div></Auf>
          <Auf a={3} aus={9} block><div style={{ display: 'flex', gap: 30, alignItems: 'baseline' }}><span style={{ font: `600 40px ${FONT}`, width: 360 }}>Schnittpunkte</span><Tex tex="f(x) = g(x)" size={64} /></div></Auf>
        </div>
      )}
      {s >= 9.5 && (
        <>
          <Kachel a={10} spalte={0} hervor zeile="Üben mit KI" titel="Übungen 0.1.1 bis 0.1.4" text="Im E-Book, mit Rückmeldung" />
          <Kachel a={10.5} spalte={4} zeile="Nächstes Video" titel="0.2 · Ganzrationale Funktionen" text="Symmetrie und Verlauf" />
          <Kachel a={11} spalte={8} zeile="E-Book" titel="Lektion 0.1" text="Alles zum Nachlesen" />
        </>
      )}
    </Grund>
  );
};
