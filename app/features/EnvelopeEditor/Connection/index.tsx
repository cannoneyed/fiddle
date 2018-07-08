import * as React from 'react';
import { observer } from 'mobx-react';
import theme from 'styles/theme';

import { ScreenVector } from 'core/primitives/screen-vector';

interface Props {
  startPosition: ScreenVector;
  endPosition: ScreenVector;
}

@observer
export class Connection extends React.Component<Props, {}> {
  static strokeWidth = 2;

  render() {
    const { startPosition, endPosition } = this.props;
    const style = {
      stroke: theme.colors.white.toRgbString(),
      strokeWidth: Connection.strokeWidth,
    };

    return (
      <line
        x1={startPosition.x}
        x2={endPosition.x}
        y1={startPosition.y}
        y2={endPosition.y}
        style={style}
        onMouseDown={console.log.bind(null, '🔥 line down')}
        onMouseUp={console.log.bind(null, '🔥 line up')}
      />
    );
  }
}

export default Connection;
