import { Composition } from 'remotion';
import { Video01, DAUER_01 } from './Video01';
import { FPS } from './bausteine/zeit';

export const Root = () => (
  <Composition id="Video01" component={Video01} durationInFrames={DAUER_01} fps={FPS} width={1920} height={1080} />
);
