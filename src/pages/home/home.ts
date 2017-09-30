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
  initial= new Orientation;
  model= new Orientation;
  color: string;
  timer: number;


  constructor(public navCtrl: NavController, private deviceMotion: DeviceMotion) {
    let subscription = this.deviceMotion.watchAcceleration().subscribe((acceleration: DeviceMotionAccelerationData) => { this.model = acceleration; });


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
    for (let i = 0; i <= 360; i++) {
      this.getColor();
      await this.delay(250, i);
      this.getColor();
    }
  }

}



