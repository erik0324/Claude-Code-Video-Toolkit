import { Auf, Grund, Kopf, Lbl, Tex } from '../bausteine/Teile';
import { C, CQ, FONT, RAND } from '../bausteine/stil';
import { auf, useSchlag } from '../bausteine/zeit';

/** Kachel der Endkarte (Video-Stil .end .tile): Linie oben in Fachfarbe; nur die erste trägt die Fläche. */
const Kachel: React.FC<{ a: number; lead: string; titel: string; text: string; an?: boolean }> = ({ a, lead, titel, text, an }) => {
  const s = useSchlag();
  const p = auf(s, a, 0.6);
  return (
    <div style={{ position: 'relative', padding: CQ(1.2), background: an ? C.fachHell : 'transparent', clipPath: an ? `inset(0 ${(1 - p) * 100}% 0 0)` : undefined, height: '100%' }}>
      <div style={{ position: 'absolute', left: 0, top: 0, height: CQ(0.5), width: '100%', background: C.fach, transform: `scaleX(${p})`, transformOrigin: 'left' }} />
      <Auf a={a + 0.2} block><span style={{ display: 'block', font: `600 ${CQ(1.2)}px ${FONT}`, letterSpacing: '0.07em', textTransform: 'uppercase', color: an ? C.fachText : C.label, marginTop: CQ(0.6) }}>{lead}</span></Auf>
      <Auf a={a + 0.3} block><b style={{ display: 'block', font: `800 ${CQ(2.4)}px/1.1 ${FONT}`, letterSpacing: '-0.02em', marginTop: CQ(0.4) }}>{titel}</b></Auf>
      <Auf a={a + 0.45} block><span style={{ display: 'block', font: `500 ${CQ(1.35)}px/1.4 ${FONT}`, color: C.tinte2, marginTop: CQ(0.6) }}>{text}</span></Auf>
    </div>
  );
};

/** Website-Name und Adresse stehen noch nicht fest; bis dahin ohne Adresse. */
export const WEBSITE_ADRESSE = '';

export const S8Abschluss: React.FC<{ schlaege: number }> = () => {
  const s = useSchlag();
  return (
    <Grund meta="0.1 · Abschluss">
      {s < 9.5 && (
        <>
          <Kopf a={0} zeile="Abschluss" titel="Auf einen Blick" aus={9} />
          <div style={{ position: 'absolute', left: RAND, top: CQ(19), width: CQ(80) }}>
            <Lbl a={2} aus={9}>Nullstellen</Lbl>
            <Auf a={2.4} aus={9} block><Tex tex="f(x) = 0 \ \text{lösen}" size={CQ(3.4)} /></Auf>
            <div style={{ height: CQ(2) }} />
            <Lbl a={3} aus={9}>Schnittpunkte zweier Graphen · danach y-Wert einsetzen</Lbl>
            <Auf a={3.4} aus={9} block><Tex tex="f(x) = g(x) \ \text{lösen}" size={CQ(3.4)} /></Auf>
          </div>
        </>
      )}
      {s >= 9.5 && (
        <div style={{ position: 'absolute', inset: 0, display: 'grid', gridTemplateColumns: 'repeat(12, 1fr)', padding: `0 ${CQ(5)}px`, columnGap: CQ(2), alignContent: 'center' }}>
          <div style={{ gridColumn: '1 / -1', marginBottom: CQ(3) }}>
            <Auf a={9.6} block><div style={{ font: `800 ${CQ(4.4)}px/1 ${FONT}`, letterSpacing: '-0.03em' }}>Weiter geht’s</div></Auf>
          </div>
          <div style={{ gridColumn: 'span 4' }}><Kachel a={10} an lead="Auf unserer Website" titel="Interaktiver Trainer" text={`Lektion 0.1 üben, mit Rückmeldung von der KI${WEBSITE_ADRESSE ? ' · ' + WEBSITE_ADRESSE : ''}`} /></div>
          <div style={{ gridColumn: 'span 4' }}><Kachel a={10.6} lead="Nächstes Video" titel="Video 0.2" text="Ganzrationale Funktionen" /></div>
          <div style={{ gridColumn: 'span 4' }}><Kachel a={11.2} lead="Zum Nachlesen" titel="E-Book" text="Lektion 0.1 · Funktionen und ihre Darstellung" /></div>
        </div>
      )}
    </Grund>
  );
};
