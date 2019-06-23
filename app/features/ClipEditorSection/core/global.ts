import { Service } from 'libs/typedi';

import { SnapToGrid } from 'core/models/snap-to-grid';

@Service({ global: true })
export default class ClipEditorGlobalState {
  snapToGrid = new SnapToGrid();
}
