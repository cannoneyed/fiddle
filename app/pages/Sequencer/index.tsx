import React, { Component } from 'react'
import { IReactionDisposer } from 'mobx'
import { inject, observer } from 'mobx-react'
import * as tracksScroll from 'interactions/tracks/scroll'
import { observeTracksScroll } from 'observers/tracks-scroll'

import { Minimap } from 'features/Minimap'
import { Timeline } from 'features/Timeline'
import { TimelineGutter } from 'features/TimelineGutter'
import { Toolbar } from 'features/Toolbar'
import { TracksGutter } from 'features/TracksGutter'
import { TracksArea } from 'features/TracksArea'

import { sequencerLayout, SequencerLayout } from 'core/stores/sequencer/layout'
import { sequencerView, SequencerView } from 'core/stores/sequencer/view'

const styles = require('./styles.less')

interface ComponentProps {}

interface InjectedProps extends ComponentProps {
  sequencerLayout: SequencerLayout
  sequencerView: SequencerView
}

@inject(() => ({
  sequencerLayout,
  sequencerView,
}))
@observer
export class SequencerPage extends Component<ComponentProps, {}> {
  disposeObserver: IReactionDisposer
  disposeHandlers: tracksScroll.UnregisterHandlers

  get injected() {
    return this.props as InjectedProps
  }

  componentDidMount() {
    this.disposeHandlers = tracksScroll.registerHandlers()
    this.disposeObserver = observeTracksScroll()
  }

  componentWillUnmount() {
    this.disposeHandlers()
    this.disposeObserver()
  }

  render() {
    const { sequencerLayout } = this.injected
    const { minimapHeight, timelineHeight, toolbarHeight, tracksAreaHeight } = sequencerLayout

    const toolbarWrapperStyle = {
      height: toolbarHeight,
    }

    const timelineWrapperStyle = {
      height: timelineHeight,
    }

    const tracksAreaWrapperStyle = {
      height: tracksAreaHeight,
    }

    const minimapWrapperStyle = {
      height: minimapHeight,
    }

    return (
      <div className={styles.pageWrapper} id="sequencerPage">
        <div className={styles.toolbarWrapper} style={toolbarWrapperStyle}>
          <Toolbar />
        </div>
        <div className={styles.minimapWrapper} style={minimapWrapperStyle}>
          <Minimap />
        </div>
        <div className={styles.timelineWrapper} style={timelineWrapperStyle}>
          <TimelineGutter />
          <Timeline />
        </div>
        <div className={styles.tracksAreaWrapper} style={tracksAreaWrapperStyle}>
          <TracksGutter />
          <TracksArea />
        </div>
      </div>
    )
  }
}
