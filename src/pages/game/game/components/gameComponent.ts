export class LineGen {
  public canvas: HTMLCanvasElement;
  public ctx: CanvasRenderingContext2D;
  public firstPt?: any;
  public lastPt?: any;
  public yourColor: string;
  public theColor: string;
  public currentColor:string [] = ["yellow", "red", "blue", "green"];
  public lineId: number = 0;

public start = () => {
  // this.canvas.addEventListener("pointermove", () => this.draw, false);
  // this.canvas.onpointermove = this.draw;
  // this.canvas.onpointerup = this.endPointer;
  this.ctx.fillStyle = "white";
  this.ctx.fillRect(0,0,325,350);

}

  public draw = (event) => {
    let offset = this.getOffset(this.canvas);

      if(this.lastPt != null) {
        this.ctx.beginPath();
        this.ctx.lineWidth = 3;
        this.ctx.lineCap = "round";
        this.ctx.moveTo(this.lastPt.x, this.lastPt.y);
        this.ctx.lineTo(event.pageX-offset.left, event.pageY-offset.top);
        this.colorChecker(this.theColor);
        this.ctx.strokeStyle = this.yourColor;
        this.ctx.stroke();
        this.ctx.closePath();
      }
      this.lastPt = {x:event.pageX-offset.left, y:event.pageY-offset.top}
      // this.canvas.addEventListener("pointerup", this.ctx.closePath(), false);

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

  colorChecker(color) {
    for (var i = 0; i < this.currentColor.length-1; i++) {
      if (color == this.currentColor[i]) {
        this.yourColor = color;
      }
    }
  }

  endPointer() {
    this.lastPt = null;

  }

  save() {
    this.canvas.toDataURL("image/png");

  }

}
