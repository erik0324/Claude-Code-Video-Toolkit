import { Easing, interpolate, useCurrentFrame } from 'remotion';
import timing from '../timing.json';

export const FPS = 30;
export const BPM: number = timing.bpm;
/** Ein Schlag in Frames (nicht ganzzahlig; gerundet wird erst beim Vergleich). */
export const SCHLAG = (FPS * 60) / BPM;
export const TAKT = 4 * SCHLAG;
export const teil = (name: string) => {
  const t = timing.teile.find((x) => x.name === name);
  if (!t) throw new Error('Teil fehlt: ' + name);
  return { von: Math.round(t.startBar * TAKT), dauer: Math.round((t.startBar + t.bars) * TAKT) - Math.round(t.startBar * TAKT), schlaege: t.bars * 4 };
};
export const GESAMT = Math.round(timing.totalBars * TAKT);

/** Einrasten: cubic-bezier(.7,0,.2,1) aus dem Video-Stil. */
export const RASTEN = Easing.bezier(0.7, 0, 0.2, 1);

/** Aktueller Schlag innerhalb der Szene (Kommazahl). */
export const useSchlag = () => useCurrentFrame() / SCHLAG;

/** 0→1 zwischen Schlag `a` und `a + dauer` (Einrasten). */
export const auf = (s: number, a: number, dauer = 0.5) =>
  interpolate(s, [a, a + dauer], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp', easing: RASTEN });
/** Linear (für Linien, die gezeichnet werden). */
export const zeichne = (s: number, a: number, dauer: number) =>
  interpolate(s, [a, a + dauer], [0, 1], { extrapolateLeft: 'clamp', extrapolateRight: 'clamp' });
