import * as React from 'react';
import { observer } from 'mobx-react';
import styled from 'styled-components';
import { hot, injector } from 'utils/injector';
import { map } from 'lodash';

import { Clip } from 'core/models/clip';
import { SnapToGrid, snapToGridValues, SnapToGridValue } from 'core/models/snap-to-grid';

import { get, ClipEditorState } from 'features/ClipEditorSection/core';

import Select from 'components/Select';

interface Props {
  clip: Clip;
}
interface InjectedProps {
  setSnapToGrid: (value: SnapToGridValue) => void;
  snapToGrid: SnapToGrid;
}

const inject = injector<Props, InjectedProps>(props => {
  const clipEditorState = get(props.clip, ClipEditorState);
  const setSnapToGrid = (value: SnapToGridValue) => {
    clipEditorState.snapToGrid.setSnapToGridValue(value);
  };

  return {
    snapToGrid: clipEditorState.snapToGrid,
    setSnapToGrid,
  };
});

@observer
export class SelectSnapToGrid extends React.Component<Props & InjectedProps, {}> {
  render() {
    const { snapToGrid, setSnapToGrid } = this.props;

    const options = map(snapToGridValues, (snapToGridValue, key) => {
      const { name } = snapToGridValue;
      const selected = snapToGrid.value === snapToGridValue;
      return { name, value: key, selected };
    });

    return (
      <SelectWrapper>
        <Select
          options={options}
          onSelect={key => {
            const value = snapToGridValues[key];
            setSnapToGrid(value);
          }}
        />
      </SelectWrapper>
    );
  }
}

export default inject(hot(module)(SelectSnapToGrid));

const SelectWrapper = styled.div``;
