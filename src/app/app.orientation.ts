export class Orientation {
  public x?: number;
  public y?: number;
  public z?: number;
}

export class LineGen {
  public canvas: HTMLCanvasElement;
  public ctx: CanvasRenderingContext2D;
  public firstPt?: any;
  public lastPt?: any;
  public yourColor: string;
  public theColor: string;
  public currentColor:string [] = ["yellow", "red", "blue", "green"];

public start = (event) => {
  this.canvas.onpointermove = this.draw;
  this.ctx.fillStyle = "white";
  this.ctx.fillRect(0,0,325,350);
  this.canvas.onpointerup = this.endPointer;
}

public draw = (event) => {
  let offset = this.getOffset(this.canvas);
      if(this.lastPt != null) {
        this.ctx.beginPath();
        this.ctx.lineWidth = 3;
        this.ctx.moveTo(this.lastPt.x, this.lastPt.y);
        this.ctx.lineTo(event.pageX-offset.left, event.pageY-offset.top);
        this.colorChecker(this.theColor);
        this.ctx.strokeStyle = this.yourColor;
        this.ctx.stroke();
      }
      this.lastPt = {x:event.pageX-offset.left, y:event.pageY-offset.top}
  }

  getOffset(obj) {
    var offsetLeft = 0;
    var offsetTop = 0;
    do {
      if (!isNaN(obj.offsetLeft)) {
        offsetLeft += obj.offsetLeft;
      }
      if (!isNaN(obj.offsetTop)) {
        offsetTop += obj.offsetTop;
      }
    } while(obj = obj.offsetParent );
    return {left: offsetLeft, top: offsetTop};
  }

  async colorChecker(color) {
    for (var i = 0; i < this.currentColor.length-1; i++) {
      if (color == this.currentColor[i]) {
        this.yourColor = color;
      }
      await this.delay(100,9000);
      if (this.yourColor != color){
        this.yourColor = color;
      }
    }
  }

  endPointer(event) {
    // this.canvas.onpointerup =
    if(this.lastPt != null){
      this.lastPt = null;
    }
  }

  save() {
    this.canvas.toDataURL("image/png");
  }

  delay(milliseconds: number, count: number): Promise<number> {
    return new Promise<number>(resolve => {
            setTimeout(() => {
                resolve(count);
            }, milliseconds);
        });
  }
}
