import * as React from 'react';
import { clamp } from 'lodash';
import styled from 'styled-components';
import { observer } from 'mobx-react';

import { Dimensions } from 'core/interfaces';
import { ScreenVector } from 'core/primitives/screen-vector';
import { Envelope as EnvelopeModel } from 'core/models/envelope';
import { Connection as ConnectionModel } from 'core/models/envelope/connection';
import { Point as PointModel } from 'core/models/envelope/point';
import { SnapToGrid } from 'core/models/snap-to-grid';

import Point from 'features/EnvelopeEditor/Point';
import Connection from 'features/EnvelopeEditor/Connection';
import { TimelineVector } from 'core/primitives/timeline-vector';

interface Props {
  dimensions: Dimensions;
  envelope: EnvelopeModel;
  gridSegmentWidth: number;
  snapToGrid: SnapToGrid;
}

@observer
export class Envelope extends React.Component<Props, {}> {
  pointCoordinates = new Map<PointModel, ScreenVector>();

  computePointCoordinates(point: PointModel) {
    const { dimensions, envelope } = this.props;
    const x = (point.position.absoluteTicks / envelope.length.absoluteTicks) * dimensions.width;
    const y = (1 - point.value) * dimensions.height;
    return new ScreenVector(x, y);
  }

  getQuantizedPositionAndValue = (offsetX: number, offsetY: number) => {
    const { dimensions, envelope, gridSegmentWidth, snapToGrid } = this.props;
    const { height, width } = dimensions;

    const x = clamp(offsetX, 0, width);
    const nearestGridIndex = Math.round(x / gridSegmentWidth);
    const nearestBeats = snapToGrid.division.multiply(nearestGridIndex);
    const position = new TimelineVector(0, nearestBeats);

    const y = clamp(offsetY, 0, height);
    const range = envelope.maximum - envelope.minimum;
    const free = envelope.stepSize === 0;
    const steps = free ? Infinity : range / envelope.stepSize;
    const stepHeight = free ? 1 : height / steps;
    const nearestY = Math.round(y / stepHeight);
    const value = ((height - nearestY) / height) * range + envelope.minimum;

    return { position, value };
  };

  handleDoubleClick = (event: React.MouseEvent) => {
    const { offsetX, offsetY } = event.nativeEvent;
    const quantized = this.getQuantizedPositionAndValue(offsetX, offsetY);

    this.props.envelope.createPoint(quantized.position, quantized.value);
  };

  handlePointMouseDown = (point: PointModel) => (event: React.MouseEvent) => {
    const { envelope } = this.props;
    point.selected = true;

    const handleMouseMove = (event: MouseEvent) => {
      const { offsetX, offsetY } = event;
      const quantized = this.getQuantizedPositionAndValue(offsetX, offsetY);

      if (!point.position.isEqualTo(quantized.position)) {
        envelope.setPointPosition(point, quantized.position);
      }

      if (!(point.value === quantized.value)) {
        envelope.setPointValue(point, quantized.value);
      }
    };

    const handleMouseUp = () => {
      point.selected = false;
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
    };

    document.addEventListener('mousemove', handleMouseMove);
    document.addEventListener('mouseup', handleMouseUp);
  };

  handleConnectionMouseDown = (connection: ConnectionModel) => (event: React.MouseEvent) => {
    console.log('mouse down', connection);
  };

  render() {
    const { connections, points } = this.props.envelope;

    return (
      <Svg onDoubleClick={this.handleDoubleClick}>
        {connections.map(connection => {
          const startPosition = this.computePointCoordinates(connection.start);
          const endPosition = this.computePointCoordinates(connection.end);
          return (
            <Connection
              key={connection.id}
              startPosition={startPosition}
              endPosition={endPosition}
              onMouseDown={this.handleConnectionMouseDown(connection)}
            />
          );
        })}
        {points.map(point => {
          const position = this.computePointCoordinates(point);
          return (
            <Point
              key={point.id}
              position={position}
              selected={point.selected}
              onMouseDown={this.handlePointMouseDown(point)}
            />
          );
        })}
      </Svg>
    );
  }
}

const Svg = styled.svg`
  width: 100%;
  height: 100%;
`;

export default Envelope;
