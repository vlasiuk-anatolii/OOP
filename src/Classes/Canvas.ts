import Point from "./Point";
import Line from "./Line";

export default class Canvas {
  addEventListener(arg0: string, arg1: (event: any) => void) {
    throw new Error('Method not implemented.');
  }
  public canvas: HTMLCanvasElement;
  public context: CanvasRenderingContext2D | null;
  public isPressed: boolean;
  public isStart: boolean;
  public startXY: Point | null = null;
  public allLines: Line[] = [];
  public allPointsCross: Point[] = [];

  constructor(element: HTMLCanvasElement, width: number, height: number) {
    this.isStart = true;
    this.isPressed = false;
    this.canvas = element;
    this.canvas.width = width;
    this.canvas.height = height;
    this.context = this.canvas.getContext("2d");
    this.canvas.addEventListener("click", this.handleClick.bind(this));
    this.canvas.addEventListener("contextmenu", this.handleContextmenu.bind(this));
    this.canvas.addEventListener("mousemove", this.handleMousemove.bind(this));
  }

  handleClick(event: any) {

    if (this.isPressed) {
      return;
    }

    if (this.isStart) {
      this.startXY = new Point(event.offsetX, event.offsetY);
      this.isStart = false;

    } else {
      const endXY = new Point(event.offsetX, event.offsetY);
      this.allLines.push(new Line(this.startXY as Point, endXY));
      this.drawPoints();
      this.findAllCroosPoints();
      this.isStart = true;
    }
  }

  drawPoints() {

    console.log(this.allPointsCross);
    this.allPointsCross.forEach(point => {

      point.draw(this.context, 'red');
    });

    this.context?.stroke();
  };

  findAllCroosPoints() {
    console.log(this.allLines);
    this.allPointsCross = [];
    if (this.allLines.length > 1) {
      for (let i = 0; i < this.allLines.length; i++) {
        for (let j = i + 1; j < this.allLines.length; j++) {
          const temp = this.allLines[i].getPointCrossWithLine(this.allLines[j]);
          if (temp) {
            if (this.allLines[i].isBelongPointToLine(temp) && this.allLines[j].isBelongPointToLine(temp)) {
              this.allPointsCross.push(temp);
            }
          }
        }
      }
    }
  };

  handleContextmenu(event: any) {
    this.context?.clearRect(0, 0, this.canvas.width, this.canvas.height);
    this.drawLine();
    this.drawPoints();
    this.isStart = true;
  }

  handleMousemove(event: any) {
    if (!(this.isStart || this.isPressed)) {
      this.context?.clearRect(0, 0, this.canvas.width, this.canvas.height);
      if (this.startXY) {
        this.context?.moveTo(this.startXY.x, this.startXY.y);
      }
      this.context?.lineTo(event.offsetX, event.offsetY);
      this.context?.stroke();

      this.drawLine();
      this.drawPoints();
      let currentLine = null;

      if (this.startXY) {
        currentLine = new Line(this.startXY, new Point(event.offsetX, event.offsetY));

        for (let i = 0; i < this.allLines.length; i++) {
          const point = currentLine.getPointCrossWithLine(this.allLines[i]);
          if (point && this.allLines[i].isBelongPointToLine(point) && currentLine.isBelongPointToLine(point)) {
            point.draw(this.context, 'red');
          }
        }
      }
    }
  }

  drawLine() {
    if (this.context) {
      this.context?.beginPath();
      this.allLines.forEach(line => {
        this.context?.moveTo(line.start.x, line.start.y);
        this.context?.lineTo(line.end.x, line.end.y);
      });

      this.context?.stroke();
    }
  };

  animation() {
    let start: number;
    let previousTimeStamp: number;
    const timeanimation = 3000;

    const animate = (timestamp: number) => {

      if (start === undefined) {
        start = timestamp;
      }

      let elapsed = timestamp - start;

      if (previousTimeStamp !== timestamp) {

        if (this.context) {

          this.context.clearRect(0, 0, this.canvas.width, this.canvas.height);
          this.allLines.forEach(line => {
            const startX = line.start.x;
            const startY = line.start.y;
            const endX = line.end.x;
            const endY = line.end.y;
            const middlepoint = line.getMiddlePoint();
            middlepoint.draw(this.context, 'blue');
            const dx = endX - startX;
            const dy = endY - startY;
            const sx = startX + dx * elapsed / (2 * timeanimation);
            const sy = startY + dy * elapsed / (2 * timeanimation);
            const ex = endX - dx * elapsed / (2 * timeanimation);
            const ey = endY - dy * elapsed / (2 * timeanimation);
            this.context?.beginPath();
            this.context?.moveTo(sx, sy);
            this.context?.lineTo(ex, ey);
            this.context?.stroke();

            const currentLine = new Line(new Point(sx, sy), new Point(ex, ey));

            for (let i = 0; i < this.allLines.length; i++) {
              this.allPointsCross.forEach(item => {
                if (item) {
                  if (this.allLines[i].isBelongPointToLine(item) && currentLine.isBelongPointToLine(item)) {
                    item.draw(this.context, 'red');
                  }
                }
              })
            }
          })
        };
      }
      if (elapsed < timeanimation) {
        previousTimeStamp = timestamp;
        window.requestAnimationFrame(animate);
      }
    };
    window.requestAnimationFrame(animate);
  };
}
