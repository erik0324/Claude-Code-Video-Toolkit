import katex from 'katex';
import 'katex/dist/katex.min.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import '@fontsource/inter/800.css';
import '@fontsource/inter/900.css';
import React from 'react';
import { AbsoluteFill } from 'remotion';
import { C, CQ, FONT, RAND } from './stil';
import { auf, useSchlag } from './zeit';

/** Formel mit KaTeX. */
export const Tex: React.FC<{ tex: string; size?: number; color?: string; style?: React.CSSProperties }> = ({ tex, size = 48, color = C.tinte, style }) => (
  <span style={{ fontSize: size, color, lineHeight: 1.2, ...style }} dangerouslySetInnerHTML={{ __html: katex.renderToString(tex, { throwOnError: false }) }} />
);

/**
 * Text oder Formel steigt auf Schlag `a` aus einer Maske auf (Video-Stil: .clip.rise) und auf `aus` nach oben weg.
 * Die Maske hat 48 px Luft über und unter der Zeile, damit Wurzelstriche, Brüche, Exponenten und Umlaut-Punkte
 * mit dem Rest wandern und nicht vorher oder nachher allein sichtbar sind. Vor `a` und nach `aus` ist der Inhalt
 * zusätzlich ausgeblendet.
 */
const LUFT = 48;
export const Auf: React.FC<{ a: number; aus?: number; children: React.ReactNode; style?: React.CSSProperties; block?: boolean }> = ({ a, aus, children, style, block }) => {
  const s = useSchlag();
  const p = auf(s, a, 0.5);
  const q = aus === undefined ? 0 : auf(s, aus, 0.4);
  const sichtbar = s >= a && (aus === undefined || q < 1);
  const weg = (1 - p) - q;
  return (
    <div style={{ clipPath: `inset(-${LUFT}px -${LUFT}px -${LUFT}px -${LUFT}px)`, display: block ? 'block' : 'inline-block', visibility: sichtbar ? 'visible' : 'hidden', ...style }}>
      <div style={{ transform: `translateY(calc(${weg} * (100% + ${2 * LUFT}px)))` }}>{children}</div>
    </div>
  );
};

/** Haarlinie mit Beschriftung (Video-Stil: .lbl / .afb). Die Linie zeichnet sich von links. */
export const Lbl: React.FC<{ a: number; aus?: number; children: React.ReactNode; farbe?: string; style?: React.CSSProperties }> = ({ a, aus, children, farbe = C.label, style }) => {
  const s = useSchlag();
  const p = auf(s, a, 0.6);
  const q = aus === undefined ? 0 : auf(s, aus, 0.4);
  return (
    <div style={{ position: 'relative', paddingTop: CQ(0.9), ...style }}>
      <div style={{ position: 'absolute', left: 0, top: 0, height: CQ(0.12), width: '100%', background: C.tinte, transform: `scaleX(${p * (1 - q)})`, transformOrigin: q > 0 ? 'right' : 'left' }} />
      <Auf a={a + 0.15} aus={aus} block><div style={{ font: `600 ${CQ(1.2)}px ${FONT}`, letterSpacing: '0.07em', textTransform: 'uppercase', color: farbe }}>{children}</div></Auf>
    </div>
  );
};

/** Fläche wischt von links herein. */
export const Wisch: React.FC<{ a: number; aus?: number; children: React.ReactNode; style?: React.CSSProperties }> = ({ a, aus, children, style }) => {
  const s = useSchlag();
  const p = auf(s, a, 0.6);
  const q = aus === undefined ? 0 : auf(s, aus, 0.5);
  return <div style={{ clipPath: `inset(0 ${(1 - p) * 100}% 0 ${q * 100}%)`, ...style }}>{children}</div>;
};

/** Grund jeder Szene (Video-Stil: .frame + .meta): Papier, Fachkürzel als Quadrat in Fachfarbe, Ortsangabe. */
export const Grund: React.FC<{ children: React.ReactNode; meta: string }> = ({ children, meta }) => (
  <AbsoluteFill style={{ background: C.papier, fontFamily: FONT, color: C.tinte, fontFeatureSettings: '"tnum"' }}>
    <div style={{ position: 'absolute', left: CQ(5), top: CQ(3.6), display: 'flex', alignItems: 'center', gap: CQ(1.4), font: `600 ${CQ(1.15)}px/1 ${FONT}`, letterSpacing: '0.08em', textTransform: 'uppercase', color: C.label }}>
      <div style={{ width: CQ(1.6), height: CQ(1.6), borderRadius: CQ(0.35), background: C.fach, color: '#fff', display: 'grid', placeItems: 'center', font: `800 ${CQ(0.95)}px ${FONT}`, letterSpacing: 0 }}>M</div>
      {meta}
    </div>
    {children}
  </AbsoluteFill>
);

/** Überschrift einer Szene: kleine Überzeile mit Linie, darunter der Titel. */
export const Kopf: React.FC<{ a: number; zeile: string; titel: string; aus?: number; breite?: number }> = ({ a, zeile, titel, aus, breite = 1100 }) => (
  <div style={{ position: 'absolute', left: RAND, top: CQ(7.5), width: breite }}>
    <Lbl a={a} aus={aus}>{zeile}</Lbl>
    <Auf a={a + 0.4} aus={aus} block style={{ marginTop: CQ(0.4) }}>
      <div style={{ font: `800 ${CQ(2.9)}px/1.05 ${FONT}`, letterSpacing: '-0.025em' }}>{titel}</div>
    </Auf>
  </div>
);

/** Untertitel im Raster (Video-Stil: .cap). Zeigt den Satz, dessen Zeitfenster gerade läuft; <em> in Fach-Text. */
export type Satz = { a: number; aus: number; lead?: string; text: React.ReactNode };
export const Cap: React.FC<{ saetze: Satz[]; rechts?: number }> = ({ saetze, rechts = CQ(30) }) => (
  <div style={{ position: 'absolute', left: CQ(5), right: rechts, bottom: CQ(4.2), font: `600 ${CQ(2.15)}px/1.25 ${FONT}`, letterSpacing: '-0.005em', color: C.tinte }}>
    {saetze.map((z, i) => (
      <div key={i} style={{ position: 'absolute', left: 0, right: 0, bottom: 0 }}>
        {z.lead && <Auf a={z.a} aus={z.aus} block><span style={{ display: 'block', font: `500 ${CQ(1.2)}px ${FONT}`, letterSpacing: '0.06em', textTransform: 'uppercase', color: C.label }}>{z.lead}</span></Auf>}
        <Auf a={z.a + 0.1} aus={z.aus} block>{z.text}</Auf>
      </div>
    ))}
  </div>
);
export const Em: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <em style={{ fontStyle: 'normal', color: C.fachText, boxShadow: `inset 0 -${CQ(0.5)}px 0 ${C.fachHell}` }}>{children}</em>
);

/** Ganze Szene wischt im letzten halben Schlag nach links weg. */
export const Abgang: React.FC<{ schlaege: number; children: React.ReactNode }> = ({ schlaege, children }) => {
  const s = useSchlag();
  const q = auf(s, schlaege - 0.6, 0.5);
  return <AbsoluteFill style={{ clipPath: `inset(0 0 0 ${q * 100}%)` }}>{children}</AbsoluteFill>;
};
