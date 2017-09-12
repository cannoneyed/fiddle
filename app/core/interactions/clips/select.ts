import { action, computed } from 'mobx'

import Clip from 'core/models/Clip'
import clipStore from 'core/stores/clips'

class ClipSelectInteraction {
  @computed
  get selectedClips() {
    return clipStore.clips.values().filter(clip => clip.isSelected)
  }

  // Selects a single clip, removing previously selected
  @action
  selectClip = (clip: Clip) => {
    this.selectedClips.forEach(selectedClip => (selectedClip.isSelected = false))
    clip.isSelected = true
  }

  // Adds a clip to a group of selected clips
  @action
  addSelectedClip = (clip: Clip) => {
    clip.isSelected = true
  }

  // Deselects a single clip
  @action
  deselectClip = (clip: Clip) => {
    clip.isSelected = false
  }

  // Deselects all clips
  @action
  deselectAllClips = () => {
    this.selectedClips.forEach(clip => {
      clip.isSelected = false
    })
  }
}

export default new ClipSelectInteraction()
export { ClipSelectInteraction }
