export default class Point {
  public x: number;
  public y: number;

  /**
   * @param {number} [x = 0]
   * @param {number} [y = 0]
   */
  constructor(x: number = 0, y: number = 0) {
    /** @var {number} - is position on OX axis */
    this.x = x;

    /** @var {number} - is position on OY axis */
    this.y = y;
  }

  draw(ctx: any, color: string = 'red') {
    console.log(ctx);
    if (ctx) {
      ctx.beginPath();
      ctx.fillStyle = color;
      console.log("in",color);
      console.log("out",ctx.fillStyle);
      ctx.arc(this.x, this.y, 3, 0, 360, false);
      ctx.stroke();
      ctx.fill();
    }
  }
}