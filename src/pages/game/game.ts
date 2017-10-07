import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Orientation, LineGen } from '../../app/app.orientation'
import { DeviceMotion, DeviceMotionAccelerationData } from '@ionic-native/device-motion';

@Component({
  selector: 'page-game',
  templateUrl: 'game.html'
})

export class GamePage {
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
    this.generator.canvas = <HTMLCanvasElement>document.getElementById('gameSprite');
    this.generator.ctx = this.generator.canvas.getContext("2d");
    this.generator.theColor = this.color;

    if(this.color != null) {
      this.generator.start("pointerdown");
      this.generator.endPointer("pointerup");
    }

    function clear() {
      this.generator.ctx.restore();
    }
  }

  save() {
    this.generator.save();
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
    //Idea I had for limiting the number of instances that can be ran at once.
    // var counter: number;
    // counter +1;
    // if( counter = 1 ){

    this.startTimer();
    for (let i = 0; i <= 900; i++) {
      this.getColor();
      await this.delay(100, i);
      this.getColor();
    }
    // counter -1;
  }
  // else {console.log("cannot run more than one game instance");}

}





