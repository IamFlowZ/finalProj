import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Orientation, LineGen } from '../../app/app.orientation'
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  model= new Orientation;
  generator = new LineGen;
  color: string;
  timer: number = 0;
  x: number;
  y: number;



  constructor(public navCtrl: NavController, private deviceMotion: DeviceMotion) {
    const subscription = this.deviceMotion.watchAcceleration().subscribe((acceleration: DeviceMotionAccelerationData) => { this.model = acceleration; });


  }

  canvasStart() {
    this.generator.canvas = document.getElementById('gameSprite');
    this.generator.ctx = this.generator.canvas.getContext("2d");
    this.generator.theColor = this.color;

    if(this.color != null) {
      this.generator.canvas.addEventListener("pointerdown", this.generator.draw("pointermove"), false);
      this.generator.canvas.addEventListener("pointerup", this.generator.endPointer("pointerup"), false);
    }

    function clear() {
      this.generator.ctx.restore();
    }
    function save() {
      let image = this.generator.canvas.toDataURL("image/png");

    }

  }

  //


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
    //Idea I had for limiting the number of instances that can be ran at once.
    // var counter: number;
    // counter +1;
    // if( counter = 1 ){

    this.startTimer();
    for (let i = 0; i <= 9000; i++) {
      this.getColor();
      await this.delay(10, i);
      this.getColor();
    }
    // counter -1;
  }
  // else {console.log("cannot run more than one game instance");}

}





