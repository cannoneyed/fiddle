import { sequencerDOM } from 'core/dom/sequencer';
import { sequencerView } from 'core/stores/sequencer/view';

export const getNextScrollPercentX = (deltaX: number) => {
  const { minimap, minimapScroll } = sequencerDOM;
  const { tracksScrollPercentX } = sequencerView.tracks;

  if (minimap && minimapScroll) {
    const minimapWidth = minimap.clientWidth;
    const minimapScrollWidth = minimapScroll.clientWidth;

    const scrollableMinimapWidth = minimapWidth - minimapScrollWidth;
    const deltaPercentX = deltaX / scrollableMinimapWidth;

    const nextScrollPercentX = tracksScrollPercentX + deltaPercentX;
    return nextScrollPercentX;
  }
  return tracksScrollPercentX;
};
