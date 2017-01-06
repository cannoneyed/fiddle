import React, { Component, PropTypes } from 'react'
import autobind from 'autobind-decorator'
import { inject, observer, PropTypes as ObsPropTypes } from 'mobx-react'
import { ContextMenuTarget } from '@blueprintjs/core'

import TrackContextMenu from 'containers/TrackContextMenu'
import Clip from 'containers/Clip'

import sequencerViewStore from 'core/sequencer/view'
import sequencerInteractionStore from 'core/sequencer/interaction'

import styles from './styles.less'

@inject(() => ({
  handleTrackClick: sequencerInteractionStore.handleTrackClick,
  trackHeight: sequencerViewStore.trackHeight,
  trackWidth: sequencerViewStore.trackWidth,
}))
@observer
@ContextMenuTarget
export default class TrackContainer extends Component {
  static propTypes = {
    handleTrackClick: PropTypes.func.isRequired,
    track: ObsPropTypes.observableObject.isRequired,
    trackHeight: PropTypes.number.isRequired,
    trackWidth: PropTypes.number.isRequired,
  }

  handleClick = (event) => {
    const { track, handleTrackClick } = this.props
    handleTrackClick(track, event)
  }

  @autobind
  renderContextMenu(e) {
    const { track } = this.props
    const { offsetX } = e.nativeEvent

    return (
      <TrackContextMenu trackId={ track.id } position={ offsetX } />
    )
  }

  render() {
    const { track, trackHeight, trackWidth } = this.props

    const trackStyle = {
      height: trackHeight,
      width: trackWidth,
    }

    return (
      <div
        className={ styles.trackContainer }
        style={ trackStyle }
        onMouseDown={ this.handleClick }
      >
        { track.clips.map((clip, index) => (
          <Clip clip={ clip } key={ index } />
        ))}
      </div>
    )
  }
}
