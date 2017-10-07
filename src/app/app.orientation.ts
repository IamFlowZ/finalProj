export class Orientation {
  public x?: number;
  public y?: number;
  public z?: number;
}

export class LineGen {
  public canvas: HTMLCanvasElement;
  public ctx: CanvasRenderingContext2D;
  public lastPt?: any;
  public yourColor: string;
  public theColor: string;
  public currentColor:string [] = ["yellow", "red", "blue", "green"];

public start = (event) => {
  this.canvas.addEventListener("pointermove", this.draw, false);
  this.ctx.fillStyle = "white";
  this.ctx.fillRect(0,0,325,350);
}

  public draw = (event) => {
    let offset = getOffset(this.canvas);
    // this.ctx = this.canvas.getContext("2d");
    this.lastPt = {x:event.pageX-offset.left, y:event.pageY-offset.top}
      if(this.lastPt != null) {
        // this.colorChecker(this.theColor);
        // this.ctx.strokeStyle = this.yourColor;
        this.ctx.beginPath();
        this.ctx.lineWidth = 10;
        this.ctx.moveTo(this.lastPt.x,this.lastPt.y);
        this.ctx.lineTo(event.pageX-offset.left, event.pageY-offset.top);
        this.ctx.stroke();
      }

      function getOffset(obj) {
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

  }

   colorChecker(color) {
    for (var i = 0; i < this.currentColor.length-1; i++) {
      if (color == this.currentColor[i]) {
        this.yourColor = color;
      }
    }
  }

  endPointer(event) {
    this.canvas.removeEventListener("pointermove", this.draw, false);
   this.lastPt = null;
  }

  save() {
    this.canvas.toDataURL("image/png");
  }
}
