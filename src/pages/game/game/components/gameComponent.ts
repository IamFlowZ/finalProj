export class LineGen {
  public canvas: HTMLCanvasElement;
  public ctx: CanvasRenderingContext2D;
  public lastPt?: any;
  public theColor: string;
  public lineWidth: number;
  public image: any;

public start = () => {
  this.canvas.addEventListener("pointerdown", this.newLine, false);
  this.canvas.addEventListener("pointerup", this.endPointer, false);
  this.ctx.fillStyle = "white";
  this.ctx.fillRect(0,0,325,350);
  // this.ctx.lineWidth = this.lineWidth;
  this.ctx.lineCap = "round";

}

public draw = (event) => {
  let offset = this.getOffset(this.canvas);
    if(this.lastPt != null) {
      this.ctx.beginPath();
      this.ctx.moveTo(this.lastPt.x, this.lastPt.y);
      this.ctx.lineTo(event.pageX-offset.left, event.pageY-offset.top);
      this.ctx.strokeStyle = this.theColor;
      this.ctx.stroke();
      this.ctx.save();
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

  endPointer = (event) => {
    this.canvas.removeEventListener("pointermove", this.draw, false);
    delete this.lastPt;
  }

  newLine = (event) => {
    this.canvas.addEventListener("pointermove", this.draw, false);
  }

  save() {
    this.image = this.canvas.toDataURL("image/png");

  }

  // undo() {
  //   this.ctx.restore();
  // }

}
