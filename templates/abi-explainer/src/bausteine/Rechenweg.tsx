import React from 'react';
import { Auf, Tex } from './Teile';
import { C, FONT } from './stil';

/** Rechenweg wie im E-Book: nummerierte Kreise, eine Zeile pro Schritt. */
export const Schritt: React.FC<{ n: number; a: number; aus?: number; tex: string; fach?: boolean; notiz?: string; size?: number }> = ({ n, a, aus, tex, fach, notiz, size = 46 }) => (
  <Auf a={a} aus={aus} block>
    <div style={{ display: 'flex', alignItems: 'center', gap: 26, height: 84 }}>
      <div style={{ width: 44, height: 44, borderRadius: 22, background: C.fachHell, color: C.fachText, display: 'grid', placeItems: 'center', font: `700 22px ${FONT}`, flex: 'none' }}>{n}</div>
      <Tex tex={tex} size={size} color={fach ? C.fach : C.tinte} />
      {notiz && <span style={{ font: `500 24px ${FONT}`, color: C.tinte2 }}>{notiz}</span>}
    </div>
  </Auf>
);
