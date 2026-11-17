import React from 'react';
import { Auf, Tex } from './Teile';
import { C, CQ, FONT } from './stil';
import { auf, useSchlag } from './zeit';

/** Rechenweg wie im Video-Stil (.calc): Nummer grau links, eine Zeile pro Schritt, was sich ändert in Fachfarbe. */
export const Schritt: React.FC<{ n: number; a: number; aus?: number; tex: string; fach?: boolean; grau?: number; size?: number }> = ({ n, a, aus, tex, fach, grau, size = CQ(3.1) }) => {
  const s = useSchlag();
  const g = grau === undefined ? 0 : auf(s, grau, 0.5);
  const sichtbar = s >= a && (aus === undefined || s < aus + 0.4);
  return (
    <div style={{ display: 'grid', gridTemplateColumns: `${CQ(4.2)}px 1fr`, alignItems: 'baseline', marginBottom: CQ(1.1) }}>
      <b style={{ font: `700 ${CQ(1.4)}px ${FONT}`, color: C.label, visibility: sichtbar ? 'visible' : 'hidden' }}>{n}</b>
      <Auf a={a} aus={aus}><Tex tex={tex} size={size} color={fach ? C.fach : g > 0.5 ? C.grau : C.tinte} /></Auf>
    </div>
  );
};
