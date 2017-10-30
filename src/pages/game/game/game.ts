import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { DeviceMotion, DeviceMotionAccelerationData, DeviceMotionAccelerometerOptions } from '@ionic-native/device-motion';
import { LineGen } from './components/gameComponent';
import { Orientation } from './components/orientationTracker';
// import { LobbyService } from '../../../app/shared/app.server';

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
    var options = { frequency: 100 };
    const subscription = this.deviceMotion.watchAcceleration(options).subscribe((acceleration: DeviceMotionAccelerationData) => { this.model = acceleration; this.generator.theColor = this.color; });


  }

  canvasStart() {
    this.generator.canvas = <HTMLCanvasElement>document.getElementById('gameSprite');
    this.generator.ctx = this.generator.canvas.getContext("2d");
    if(window.event) {
      this.generator.start();
    }

  }

  undo() {
    this.generator.ctx.restore();
  }

  getColor() {
    if ( this.model.x > 6) { this.color = "red"; }

    if ( this.model.x < -6) { this.color = "blue"; }

    if ( this.model.y > 9) { this.color = "green"; }

    if ( this.model.y < 0) { this.color = "yellow"; }

    //if all values are between those......
    if ( this.model.x < 6 && this.model.x > -6 && this.model.y < 9 && this.model.y > 0) { this.color = "black"; }
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
