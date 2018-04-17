import * as React from 'react';

const styles = require('./styles.less');

interface Props {
  scrollPositionPercent: number;
  scrollWidthPercent: number;
  onThumbDrag: (delta: number) => void;
  onThumbResize: (delta: number) => void;
}

export class HorizontalScrollbar extends React.Component<Props, {}> {
  render() {
    return <div className={styles.horizontalScrollbarWrapper} />;
  }
}

export default HorizontalScrollbar;