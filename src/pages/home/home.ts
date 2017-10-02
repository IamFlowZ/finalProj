import { subscribeToResult } from 'rxjs/util/subscribeToResult';
import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Orientation } from '../../app/app.orientation'
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  orientation: Orientation;
  model= new Orientation;
  color: string;
  timer: number;
  x: number;
  y: number;
  lastPt?: any;


  constructor(public navCtrl: NavController, private deviceMotion: DeviceMotion) {
    let subscription = this.deviceMotion.watchAcceleration().subscribe((acceleration: DeviceMotionAccelerationData) => { this.model = acceleration; });
    //need to: figure out better offset, set bounds, color changing capbilities after initial method call, need to refine color checker

  }

  canvasStart() {
    let canvas: any = document.getElementById('gameSprite');
    let ctx = canvas.getContext("2d");
    let offset = getOffset(canvas);
    let color = this.color;

    if(this.color!= null) {
      canvas.addEventListener("pointerdown", function() {
        canvas.addEventListener("pointermove", draw, false);
    }
      , false)
      canvas.addEventListener("pointerup", endPointer, false);
    }

    function endPointer(event) {
     canvas.removeEventListener("pointermove", draw, false)
     this.lastPt = null;
    }
    function draw(event) {
      if(this.lastPt!=null) {
        ctx.beginPath();
        ctx.strokeStyle = color;
        ctx.LineWidth = 5;
        ctx.moveTo(this.lastPt.x,this.lastPt.y);
        ctx.lineTo(event.pageX, event.pageY);
        ctx.stroke();
      }
      this.lastPt = {x:event.pageX, y:event.pageY}
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
    function clear() {
      ctx.restore();
    }
  }

  getColor() {
    if (this.model.x <= 3 && this.model.y >= 6) {
      this.color = "red";
    }
    if(this.model.x <= -2 && this.model.y >= 6) {
      this.color = "blue";
    }
    if ( this.model.y >= 5 && this.model.z >= 8) {
      this.color="green";
    }
    if( this.model.y >= 8 && this.model.z >=5) {
      this.color= "yellow";
    }
    // else {
    //   this.color = "black";
    // }
  }

  delay(milliseconds: number, count: number): Promise<number> {
      return new Promise<number>(resolve => {
              setTimeout(() => {
                  resolve(count);
              }, milliseconds);
          });
  }

  async startTimer() {
    for (let i = 0; i <=90; i++) {
      const timer = await this.delay(1000, i);
      this.timer = timer;
    }
  }

  async colorSwapper() {
    var counter: number;
    counter +1;
    if(counter =1 ){
    this.startTimer();
    // this.canvasStart();
    for (let i = 0; i <= 360; i++) {
      this.getColor();
      await this.delay(250, i);
      this.getColor();
    }
    // counter -1;
  }
  else {console.log("cannot run more than one game instance");}

  }

}



