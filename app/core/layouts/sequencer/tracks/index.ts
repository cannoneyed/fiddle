import { Container, Service } from 'typedi';

import { GridLayout } from './grid';
import { TimelineLayout } from './timeline';
import { TracksLayout } from './tracks';
import { zoomLayout } from './zoom';

@Service()
export class TracksSectionLayout {
  grid = Container.get(GridLayout);
  timeline = Container.get(TimelineLayout);
  tracks = Container.get(TracksLayout);
  zoom = zoomLayout;
}

export const tracksSectionLayout = Container.get(TracksSectionLayout);
