import React, { useId } from 'react';
import { C, FONT } from './stil';
import { auf, useSchlag, zeichne } from './zeit';

export type Abb = { sx: (x: number) => number; sy: (y: number) => number };

/** Koordinatensystem wie im Graph-Labor des E-Books: Raster, Achsen, wenige Zahlen. */
export const Koord: React.FC<{
  w: number; h: number; x0: number; x1: number; y0: number; y1: number;
  a?: number; ticksX?: number[]; ticksY?: number[]; gitterY?: number; achsenNamen?: [string, string];
  children: (abb: Abb, s: number) => React.ReactNode;
}> = ({ w, h, x0, x1, y0, y1, a = 0, ticksX = [], ticksY = [], gitterY = 1, achsenNamen = ['x', 'y'], children }) => {
  const s = useSchlag();
  const id = 'k' + useId().replace(/[^a-zA-Z0-9]/g, '');
  const P = 24;
  const sx = (x: number) => P + ((x - x0) / (x1 - x0)) * (w - 2 * P);
  const sy = (y: number) => h - P - ((y - y0) / (y1 - y0)) * (h - 2 * P);
  const g = zeichne(s, a, 1);
  const ax = auf(s, a + 0.5, 0.6);
  const linien: React.ReactNode[] = [];
  for (let x = Math.ceil(x0); x <= x1; x++) linien.push(<line key={'gx' + x} x1={sx(x)} x2={sx(x)} y1={sy(y0)} y2={sy(y0) + (sy(y1) - sy(y0)) * g} stroke={C.raster} strokeWidth={1.5} />);
  for (let y = Math.ceil(y0 / gitterY) * gitterY; y <= y1; y += gitterY) linien.push(<line key={'gy' + y} y1={sy(y)} y2={sy(y)} x1={sx(x0)} x2={sx(x0) + (sx(x1) - sx(x0)) * g} stroke={C.raster} strokeWidth={1.5} />);
  return (
    <svg width={w} height={h} viewBox={`0 0 ${w} ${h}`} style={{ overflow: 'visible', fontFamily: FONT }}>
      {linien}
      <g opacity={ax}>
        <line x1={sx(x0)} x2={sx(x1) + 10} y1={sy(0)} y2={sy(0)} stroke={C.tinte} strokeWidth={2.5} />
        <line y1={sy(y0)} y2={sy(y1) - 10} x1={sx(0)} x2={sx(0)} stroke={C.tinte} strokeWidth={2.5} />
        <path d={`M${sx(x1) + 14} ${sy(0)} l-12 -6 v12 z`} fill={C.tinte} />
        <path d={`M${sx(0)} ${sy(y1) - 14} l-6 12 h12 z`} fill={C.tinte} />
        <text x={sx(x1) + 6} y={sy(0) + 34} fontSize={24} fontStyle="italic" fill={C.tinte}>{achsenNamen[0]}</text>
        <text x={sx(0) - 30} y={sy(y1) + 4} fontSize={24} fontStyle="italic" fill={C.tinte}>{achsenNamen[1]}</text>
        {ticksX.map((t) => <text key={'tx' + t} x={sx(t)} y={sy(0) + 30} fontSize={20} fill={C.tinte2} textAnchor="middle">{String(t).replace('-', '−')}</text>)}
        {ticksY.map((t) => <text key={'ty' + t} x={sx(0) - 12} y={sy(t) + 7} fontSize={20} fill={C.tinte2} textAnchor="end">{String(t).replace('-', '−')}</text>)}
      </g>
      <defs><clipPath id={id}><rect x={sx(x0) - 30} y={sy(y1) - 6} width={sx(x1) - sx(x0) + 60} height={sy(y0) - sy(y1) + 12} /></clipPath></defs>
      <g clipPath={`url(#${id})`}>{children({ sx, sy }, s)}</g>
    </svg>
  );
};

/** Kurve als Pfad; wird zwischen Schlag `a` und `a + dauer` gezeichnet (linear). */
export const Kurve: React.FC<{ abb: Abb; f: (x: number) => number; von: number; bis: number; a: number; dauer: number; farbe?: string; breite?: number; clipY?: [number, number] }> = ({ abb, f, von, bis, a, dauer, farbe = C.fach, breite = 5, clipY }) => {
  const s = useSchlag();
  const p = zeichne(s, a, dauer);
  if (p <= 0) return null;
  const n = 160; const ende = von + (bis - von) * p; let d = '';
  for (let i = 0; i <= n; i++) {
    const x = von + ((ende - von) * i) / n; let y = f(x);
    if (clipY) y = Math.min(Math.max(y, clipY[0]), clipY[1]);
    d += (i ? 'L' : 'M') + abb.sx(x).toFixed(1) + ' ' + abb.sy(y).toFixed(1);
  }
  return <path d={d} fill="none" stroke={farbe} strokeWidth={breite} strokeLinecap="round" strokeLinejoin="round" />;
};

/** Punkt, der auf Schlag `a` einrastet (Größe wächst aus null, kein Federn). */
export const Punkt: React.FC<{ abb: Abb; x: number; y: number; a: number; farbe?: string; r?: number; label?: string; labelDx?: number; labelDy?: number; ring?: boolean }> = ({ abb, x, y, a, farbe = C.fach, r = 10, label, labelDx = 16, labelDy = -16, ring }) => {
  const s = useSchlag();
  const p = auf(s, a, 0.35);
  if (p <= 0) return null;
  return (
    <g>
      {ring && <circle cx={abb.sx(x)} cy={abb.sy(y)} r={r * 2.2 * p} fill="none" stroke={farbe} strokeWidth={2} opacity={0.5} />}
      <circle cx={abb.sx(x)} cy={abb.sy(y)} r={r * p} fill={farbe} />
      {label && <text x={abb.sx(x) + labelDx} y={abb.sy(y) + labelDy} fontSize={26} fontWeight={600} fill={C.tinte} opacity={auf(s, a + 0.25, 0.4)}>{label}</text>}
    </g>
  );
};
