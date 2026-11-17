import { Audio, Sequence, continueRender, delayRender, staticFile } from 'remotion';
import { useEffect, useState } from 'react';
import { GESAMT, teil } from './bausteine/zeit';
import { S1Hook } from './szenen/S1Hook';
import { S2Karte } from './szenen/S2Karte';
import { S3Grundbegriffe } from './szenen/S3Grundbegriffe';
import { S4Achsen } from './szenen/S4Achsen';
import { S5Schnittpunkte } from './szenen/S5Schnittpunkte';
import { S6Fehlerfalle } from './szenen/S6Fehlerfalle';
import { S7Ballwurf } from './szenen/S7Ballwurf';
import { S7bAbiAufgabe } from './szenen/S7bAbiAufgabe';
import { S7cAbiKarte } from './szenen/S7cAbiKarte';
import { S8Abschluss } from './szenen/S8Abschluss';

export const DAUER_01 = GESAMT + 45;

const SZENEN: [string, React.FC<{ schlaege: number }>][] = [
  ['hook', S1Hook], ['kapitelkarte', S2Karte], ['grundbegriffe', S3Grundbegriffe], ['achsen', S4Achsen],
  ['schnittpunkte', S5Schnittpunkte], ['fehlerfalle', S6Fehlerfalle], ['ballwurf', S7Ballwurf], ['abikarte', S7cAbiKarte], ['abiaufgabe', S7bAbiAufgabe], ['abschluss', S8Abschluss],
];

/** Video 0.1 ohne Sprecher: Animation und Musik. Jede Szene beginnt auf einer Taktgrenze (siehe timing.json). */
export const Video01: React.FC = () => {
  const [h] = useState(() => delayRender('Schriften'));
  useEffect(() => { document.fonts.ready.then(() => continueRender(h)); }, [h]);
  return (
    <>
      {SZENEN.map(([name, S], i) => {
        const t = teil(name);
        const last = i === SZENEN.length - 1;
        return (
          <Sequence key={name} from={t.von} durationInFrames={last ? DAUER_01 - t.von : t.dauer} name={name}>
            <S schlaege={t.schlaege} />
          </Sequence>
        );
      })}
      <Audio src={staticFile('musik-0.1.wav')} />
    </>
  );
};
