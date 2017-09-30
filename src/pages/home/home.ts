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
  ctx?: any;
  x: number;
  y: number;
  lastPt?: any;


  constructor(public navCtrl: NavController, private deviceMotion: DeviceMotion) {
    let subscription = this.deviceMotion.watchAcceleration().subscribe((acceleration: DeviceMotionAccelerationData) => { this.model = acceleration; });


  }

  canvasStart() {
    let canvas = document.getElementById("gameSprite");
    function draw(event) {
      if(this.lastPt!=null) {
        this.ctx.beginPath();
        this.ctx.moveTo(this.lastPt.x,this.lastPt.y);
        this.ctx.LineTo(event.pageX, event.pageY);
        this.ctx.stroke();
      }
      this.lastPt = {x:event.pageX, y:event.pageY}
    }
    function endPointer(event) {
      canvas.removeEventListener("mousemove", draw, false)
    }
    // function getOffset(obj) {
    //   const offsetLeft = 0;
    //   const offsetTop = 0;
    // }
    // if(canvas.po)
    canvas.addEventListener("mousedown", function() {
      canvas.addEventListener("mousemove", draw, false);
    }
      , false)
      canvas.addEventListener("mouseup", endPointer, false);
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
    // need to figure out a simple way to say, "make the area that has less tilt then what is required to change colors, set color = black"
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
    this.startTimer();
    this.canvasStart();
    for (let i = 0; i <= 360; i++) {
      this.getColor();
      await this.delay(250, i);
      this.getColor();
    }
  }

}



