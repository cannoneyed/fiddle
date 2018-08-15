import { Container, ObjectType } from 'typedi';

export { default as GridLayout } from './grid';
export { default as SequencerLayout } from './layout';
export { default as SequencerState } from './state';
export { default as Timeline } from './timeline';
export { default as TracksLayout } from './tracks';
export { default as ZoomLayout } from './zoom';

export { default as ClipDragInteraction } from './interactions/clip-drag';
export { default as ClipSelectInteraction } from './interactions/clip-select';
export { default as SequencerScrollInteraction } from './interactions/scroll';
export { default as TracksInteraction } from './interactions/tracks';

export { default as ClipMoveService } from './services/clip-move';
export { default as GridService } from './services/grid';
export { default as SequencerPositionService } from './services/sequencer-position';
export { default as TracksPositionService } from './services/tracks-position';

const token = Symbol('sequencer');

export function get<T>(type: ObjectType<T>): T {
  return Container.of(token).get(type);
}

export function registerSevices() {
  console.log('🔥', 'registered sequencer section core');
}