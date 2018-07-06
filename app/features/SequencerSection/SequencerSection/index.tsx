import * as React from 'react';
import { Container } from 'typedi';
import { IReactionDisposer } from 'mobx';
import { observer } from 'mobx-react';
import * as trackScrollHandlers from 'core/interactions/tracks/scroll/handlers';
import { observeTracksScroll } from 'core/observers/tracks-scroll';
import { injector } from 'utils/injector';

import Toolbar from 'features/Toolbar';

import Minimap from 'features/SequencerSection/Minimap';
import Timeline from 'features/SequencerSection/Timeline';
import TimelineGutter from 'features/SequencerSection/TimelineGutter';
import TracksGutter from 'features/SequencerSection/TracksGutter';
import TracksArea from 'features/SequencerSection/TracksArea';
import VerticalScrollbar from 'features/SequencerSection/VerticalScrollbar';

import { SequencerSectionLayout } from 'core/state/layouts/sequencer/section';

import {
  MinimapWrapper,
  SequencerSectionWrapper,
  TimelineWrapper,
  ToolbarWrapper,
  TracksAreaWrapper,
  VerticalScrollbarWrapper,
} from './styled-components';

interface Props {}
interface InjectedProps {
  minimapHeight: number;
  sectionHeight: number;
  sectionWidth: number;
  timelineHeight: number;
  toolbarHeight: number;
  tracksAreaHeight: number;
  tracksVerticalScrollbarTop: number;
  tracksVerticalScrollbarWidth: number;
}

const inject = injector<Props, InjectedProps>(props => {
  const sequencerSectionLayout = Container.get(SequencerSectionLayout);

  return {
    minimapHeight: sequencerSectionLayout.minimapHeight,
    sectionHeight: sequencerSectionLayout.sectionHeight,
    sectionWidth: sequencerSectionLayout.sectionWidth,
    timelineHeight: sequencerSectionLayout.timelineHeight,
    toolbarHeight: sequencerSectionLayout.toolbarHeight,
    tracksAreaHeight: sequencerSectionLayout.tracksAreaHeight,
    tracksVerticalScrollbarTop: sequencerSectionLayout.tracksVerticalScrollbarTop,
    tracksVerticalScrollbarWidth: sequencerSectionLayout.tracksVerticalScrollbarWidth,
  };
});

@observer
export class SequencerSection extends React.Component<Props & InjectedProps, {}> {
  disposeObserver: IReactionDisposer;
  disposeHandlers: trackScrollHandlers.Unregister;

  componentDidMount() {
    this.disposeHandlers = trackScrollHandlers.register();
    this.disposeObserver = observeTracksScroll();
  }

  componentWillUnmount() {
    this.disposeHandlers();
    this.disposeObserver();
  }

  render() {
    const minimapWrapperStyle = {
      height: this.props.minimapHeight,
    };

    const sequencerSectionStyle = {
      height: this.props.sectionHeight,
    };

    const timelineWrapperStyle = {
      height: this.props.timelineHeight,
      width: this.props.sectionWidth,
    };

    const toolbarWrapperStyle = {
      height: this.props.toolbarHeight,
    };

    const tracksAreaWrapperStyle = {
      height: this.props.tracksAreaHeight,
      width: this.props.sectionWidth,
    };

    const verticalScrollbarWrapperStyle = {
      top: this.props.tracksVerticalScrollbarTop,
      height: this.props.sectionHeight,
      width: this.props.tracksVerticalScrollbarWidth,
    };

    return (
      <SequencerSectionWrapper style={sequencerSectionStyle}>
        <ToolbarWrapper style={toolbarWrapperStyle}>
          <Toolbar />
        </ToolbarWrapper>
        <MinimapWrapper style={minimapWrapperStyle}>
          <Minimap />
        </MinimapWrapper>
        <TimelineWrapper style={timelineWrapperStyle}>
          <TimelineGutter />
          <Timeline />
        </TimelineWrapper>
        <TracksAreaWrapper style={tracksAreaWrapperStyle}>
          <TracksGutter />
          <TracksArea />
        </TracksAreaWrapper>
        <VerticalScrollbarWrapper style={verticalScrollbarWrapperStyle}>
          <VerticalScrollbar />
        </VerticalScrollbarWrapper>
      </SequencerSectionWrapper>
    );
  }
}

export default inject(SequencerSection);
