import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DeviceMotion, DeviceMotionAccelerationData, DeviceMotionAccelerometerOptions } from '@ionic-native/device-motion';
import { LineGen } from './components/gameComponent';
import { Orientation } from './components/orientationTracker';
import { LobbyService } from '../../../app/shared/app.server';

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
  // lineId: number = 0;


  constructor(public navCtrl: NavController, private deviceMotion: DeviceMotion) {
    var options = { frequency: 100}
    const subscription = this.deviceMotion.watchAcceleration(options).subscribe((acceleration: DeviceMotionAccelerationData) => { this.model = acceleration; this.generator.theColor = this.color; });




  }

  canvasStart() {
    this.generator.canvas = <HTMLCanvasElement>document.getElementById('gameSprite');
    this.generator.ctx = this.generator.canvas.getContext("2d");
    if(this.color != null) {
      this.generator.start();
      this.generator.canvas.addEventListener("pointermove", () => this.generator.draw, false);
      // this.generator.canvas.addEventListener("pointerup", () => this.generator.endPointer, false);

    }

    function clear() {
      this.generator.ctx.restore();
    }
  }

  save() {
    this.generator.save();
  }

  getColor() {
    if ( this.model.x <= 3 && this.model.y >= 6) { this.color = "red"; }

    if ( this.model.x <= -2 && this.model.y >= 6) { this.color = "blue"; }

    if ( this.model.y >= 5 && this.model.z >= 8) { this.color="green"; }

    if ( this.model.y >= 8 && this.model.z >=5) { this.color= "yellow"; }

    else { this.color = "black";}
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
    for (let i = 0; i <= 900; i++) {
      this.getColor();
      await this.delay(100, i);
      this.getColor();
    }
  }

}
