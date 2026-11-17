/** Design-Tokens nach Video-Stil und E-Book-Stil (Mathe). Nur ein Element pro Bild trägt `fach`. */
export const C = {
  papier: '#F4F5F7',
  blatt: '#FFFFFF',
  tinte: '#111318',
  tinte2: '#5B6170',
  grau: '#A3A9B5',
  linie: '#D9DDE4',
  raster: '#E6E9EE',
  fach: '#1F5ED9',
  fachHell: '#EDF4FF',
  fachText: '#0E388B',
};
export const FONT = "'Inter', system-ui, sans-serif";
/** 12-Spalten-Raster auf 1920 px, 96 px Rand, 24 px Abstand. */
export const RAND = 96;
export const SPALTE = (1920 - 2 * RAND - 11 * 24) / 12;
export const x = (spalte: number) => RAND + spalte * (SPALTE + 24);
export const breite = (spalten: number) => spalten * SPALTE + (spalten - 1) * 24;
