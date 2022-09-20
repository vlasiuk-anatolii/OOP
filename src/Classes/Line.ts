import Point from "./Point";
export default class Line {
  public start: Point;
  public end: Point;

  /**
   * @param {Point} start
   * @param {Point} end
   */
  constructor(start: Point, end: Point) {
    if (!start || !end) {
      throw new Error("Can't create Line with these points");
    }

    this.start = start;
    this.end = end;
  }

  /**
   * @return {number} - the A coefficient in Ax+By+C=0
   * @constructor
   */
  getA(): number {
    return this.start.y - this.end.y;
  }

  /**
   * @return {number} - the B coefficient in Ax+By+C=0
   * @constructor
   */
  getB(): number {
    return this.end.x - this.start.x;
  }

  /**
   * @return {number} - the C coefficient in Ax+By+C=0
   * @constructor
   */
  getC(): number {
    return this.start.x * (this.end.y - this.start.y)
      + this.start.y * (this.start.x - this.end.x);
  }

  /**
   * @return {Point | null} - the point of intersection of two straight lines
   * - solving linear systems using Cramer's Rule
   */

  getPointCrossWithLine(line: Line): Point | null {
    const delta: number = this.getA() * line.getB() - this.getB() * line.getA();
    const delta1: number = -this.getC() * line.getB() - this.getB() * (-line.getC());
    const delta2: number = this.getA() * (-line.getC()) + this.getC() * line.getA();

    if (delta) {
      return new Point(delta1 / delta, delta2 / delta);
    }

    return null;
  }

  getMiddlePoint() {
    const xMiddle = (this.start.x + this.end.x) / 2;
    const yMiddle = (this.start.y + this.end.y) / 2;

    return new Point(xMiddle, yMiddle);
  }

  isBelongPointToLine(point: Point) {
    if (((this.start.x <= point.x && point.x <= this.end.x)
      || (this.start.x >= point.x && point.x >= this.end.x))
      && ((this.start.y <= point.y && point.y <= this.end.y)
        || (this.start.y >= point.y && point.y >= this.end.y))) {
      return true;
    } else {
      return false;
    }
  }
}