import * as React from 'react';
import styled from 'styled-components';
import theme from 'styles/theme';
import { Container } from 'typedi';
import { observer } from 'mobx-react';
import { injector } from 'utils/injector';
import { Button } from '@blueprintjs/core';

import SelectSnapToGrid from 'components/SelectSnapToGrid';

import { TrackActions } from 'core/actions/track';
import { ZoomLayout } from 'core/state/layouts/sequencer/zoom';

export interface Props {}
export interface InjectedProps {
  createTrack: () => void;
  zoomInHorizontal: () => void;
  zoomOutHorizontal: () => void;
}

const inject = injector<Props, InjectedProps>(props => {
  const zoomLayout = Container.get(ZoomLayout);
  const trackActions = Container.get(TrackActions);

  return {
    createTrack: () => trackActions.createTrack(),
    zoomInHorizontal: () => zoomLayout.zoomInHorizontal(),
    zoomOutHorizontal: () => zoomLayout.zoomOutHorizontal(),
  };
});

@observer
export class Toolbar extends React.Component<Props & InjectedProps, {}> {
  render() {
    const { createTrack, zoomInHorizontal, zoomOutHorizontal } = this.props;

    return (
      <ToolbarContainer>
        <Button icon="add" onClick={() => createTrack()}>
          Add Track
        </Button>
        <Button icon="zoom-in" onClick={() => zoomInHorizontal()} />
        <Button icon="zoom-out" onClick={() => zoomOutHorizontal()} />
        <SelectSnapToGrid />
      </ToolbarContainer>
    );
  }
}

export default inject(Toolbar);

const ToolbarContainer = styled.div`
  position: absolute;
  top: 0px;
  height: ${theme.toolbarHeight.toString()};

  display: flex;
  flex-direction: row;
  align-items: center;
`;
