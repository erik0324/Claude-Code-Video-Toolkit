import katex from 'katex';
import 'katex/dist/katex.min.css';
import '@fontsource/inter/400.css';
import '@fontsource/inter/500.css';
import '@fontsource/inter/600.css';
import '@fontsource/inter/700.css';
import '@fontsource/inter/800.css';
import React from 'react';
import { AbsoluteFill } from 'remotion';
import { C, FONT, RAND } from './stil';
import { auf, useSchlag } from './zeit';

/** Formel mit KaTeX. */
export const Tex: React.FC<{ tex: string; size?: number; color?: string; style?: React.CSSProperties }> = ({ tex, size = 48, color = C.tinte, style }) => (
  <span style={{ fontSize: size, color, lineHeight: 1.2, ...style }} dangerouslySetInnerHTML={{ __html: katex.renderToString(tex, { throwOnError: false }) }} />
);

/** Text steigt auf Schlag `a` aus einer Maske auf (und verschwindet auf Schlag `aus`). */
export const Auf: React.FC<{ a: number; aus?: number; children: React.ReactNode; style?: React.CSSProperties; block?: boolean }> = ({ a, aus, children, style, block }) => {
  const s = useSchlag();
  const p = auf(s, a, 0.5);
  const q = aus === undefined ? 0 : auf(s, aus, 0.4);
  return (
    <div style={{ overflow: 'hidden', display: block ? 'block' : 'inline-block', paddingBottom: 6, ...style }}>
      <div style={{ transform: `translateY(${(1 - p) * 110 - q * 110}%)` }}>{children}</div>
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

/** Grund jeder Szene: Papier, Fachkürzel oben links, Lektionsnummer oben rechts, feines Raster. */
export const Grund: React.FC<{ children: React.ReactNode; ueberzeile?: string }> = ({ children, ueberzeile }) => (
  <AbsoluteFill style={{ background: C.papier, fontFamily: FONT, color: C.tinte, fontFeatureSettings: '"tnum"' }}>
    <div style={{ position: 'absolute', left: RAND, top: 48, display: 'flex', alignItems: 'center', gap: 14 }}>
      <div style={{ width: 40, height: 40, borderRadius: 8, border: `2px solid ${C.tinte}`, display: 'grid', placeItems: 'center', font: `800 20px ${FONT}` }}>M</div>
      <div style={{ font: `600 18px ${FONT}`, letterSpacing: '0.08em', textTransform: 'uppercase', color: C.tinte2 }}>{ueberzeile ?? 'Mathematik · Lektion 0.1'}</div>
    </div>
    <div style={{ position: 'absolute', right: RAND, top: 54, font: `600 18px ${FONT}`, color: C.grau, letterSpacing: '0.04em' }}>0.1</div>
    {children}
  </AbsoluteFill>
);

/** Überschrift einer Szene (Überzeile + Titel), wie die Abschnittsköpfe im E-Book. */
export const Kopf: React.FC<{ a: number; zeile: string; titel: string; aus?: number }> = ({ a, zeile, titel, aus }) => (
  <div style={{ position: 'absolute', left: RAND, top: 132 }}>
    <Auf a={a} aus={aus} block>
      <div style={{ font: `600 20px ${FONT}`, letterSpacing: '0.08em', textTransform: 'uppercase', color: C.fachText }}>{zeile}</div>
    </Auf>
    <Auf a={a + 0.25} aus={aus} block>
      <div style={{ font: `800 52px/1.05 ${FONT}`, letterSpacing: '-0.025em' }}>{titel}</div>
    </Auf>
  </div>
);

/** Karte wie im E-Book: Definition (Fach-Hell-Fläche), Merksatz (Rahmen in Fachfarbe), Fehler (grau). */
export const Karte: React.FC<{ art: 'definition' | 'merksatz' | 'neutral'; titel?: string; children: React.ReactNode; style?: React.CSSProperties }> = ({ art, titel, children, style }) => (
  <div
    style={{
      borderRadius: 18,
      padding: '28px 34px',
      background: art === 'definition' ? C.fachHell : C.blatt,
      border: art === 'merksatz' ? `3px solid ${C.fach}` : art === 'neutral' ? `1px solid ${C.linie}` : 'none',
      ...style,
    }}
  >
    {titel && <div style={{ font: `700 18px ${FONT}`, letterSpacing: '0.07em', textTransform: 'uppercase', color: art === 'neutral' ? C.tinte2 : C.fachText, marginBottom: 12 }}>{titel}</div>}
    {children}
  </div>
);

/** Ganze Szene wischt im letzten halben Schlag nach links weg. */
export const Abgang: React.FC<{ schlaege: number; children: React.ReactNode }> = ({ schlaege, children }) => {
  const s = useSchlag();
  const q = auf(s, schlaege - 0.6, 0.5);
  return <AbsoluteFill style={{ clipPath: `inset(0 0 0 ${q * 100}%)` }}>{children}</AbsoluteFill>;
};
