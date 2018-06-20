import * as React from 'react';
import { Container } from 'typedi';
import { observer } from 'mobx-react';
import { injector } from 'utils/injector';

import { Menu, MenuItem } from '@blueprintjs/core';

import { ClipActions } from 'core/actions/clip';
import { TimelineVector } from 'core/primitives/timeline-vector';
import { TrackActions } from 'core/actions/track';
import { SequencerPositionService } from 'core/services/sequencer/position';

interface Props {
  trackId: string;
  offsetX: number;
}
interface InjectedProps {
  createClip: () => void;
  deleteTrack: () => void;
}

const inject = injector<Props, InjectedProps>(props => {
  const { offsetX, trackId } = props;
  const clipActions = Container.get(ClipActions);
  const trackActions = Container.get(TrackActions);
  const sequencerPositionService = Container.get(SequencerPositionService);

  const position = sequencerPositionService.getTimelineVectorFromOffsetX(offsetX);
  const length = new TimelineVector(2);
  return {
    createClip: () => clipActions.createClip({ trackId, length, position }),
    deleteTrack: () => trackActions.deleteTrack(trackId),
  };
});

@observer
export class TrackContextMenu extends React.Component<Props & InjectedProps, {}> {
  render() {
    return (
      <Menu>
        <MenuItem onClick={() => this.props.createClip()} icon="insert" text="New Clip" />
        <MenuItem onClick={() => this.props.deleteTrack()} icon="cross" text="Delete Track" />
      </Menu>
    );
  }
}

export default inject(TrackContextMenu);
