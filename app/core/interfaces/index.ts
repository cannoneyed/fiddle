export interface Dimensions {
  height: number;
  width: number;
}

export interface Position {
  left: number;
  top: number;
}

export interface Rectangle extends Dimensions, Position {}
