import * as React from 'react';
import theme from 'styles/theme';
import { observer } from 'mobx-react';
import { Group, Line, Text } from 'react-konva';
import { range } from 'lodash';
import { makePoints } from 'utils/konva';

import { Dimensions } from 'core/interfaces';
import { Fraction } from 'core/primitives/fraction';

export interface Props {
  dimensions: Dimensions;
  division: Fraction;
  divisionWidth: number;
  nDivisions: number;
}

@observer
export default class TimelineSegments extends React.Component<Props, {}> {
  renderTimelineLabel = (timelineLabel: number) => {
    const { dimensions } = this.props;
    const color = theme.colors.lightGray.toRgbString();

    return (
      <Text
        text={`${timelineLabel}`}
        x={5}
        y={dimensions.height - 12}
        fontSize={10}
        fontFamily="monospace"
        fill={color}
      />
    );
  };

  render() {
    const { dimensions, division, divisionWidth, nDivisions } = this.props;
    const color = theme.colors.lightGray.toRgbString();

    const timelineSegments = range(nDivisions).map(n => {
      const { numerator, denominator } = division.multiply(n, 1).reduce();

      const isMajorDivision = denominator === 1 && n % 2 == 0;
      const timelineLabel = isMajorDivision ? numerator + 1 : null;

      const x = n * divisionWidth;
      const divisionHeight = 10;

      const start = { x: 0, y: dimensions.height };
      const end = { x: 0, y: dimensions.height - divisionHeight };
      const linePoints = makePoints([start, end]);

      return (
        <Group key={n} x={x}>
          <Line key={n} points={linePoints} strokeWidth={1} stroke={color} />
          {timelineLabel && this.renderTimelineLabel(timelineLabel)}
        </Group>
      );
    });

    return <Group {...dimensions}>{timelineSegments}</Group>;
  }
}