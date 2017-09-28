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


  constructor(public navCtrl: NavController, private deviceMotion: DeviceMotion) {
    this.color = "this isn't working";


  }

  getColor() {
    var subscription = this.deviceMotion.watchAcceleration().subscribe((acceleration: DeviceMotionAccelerationData) => { this.model = acceleration; });
    // var start = this.deviceMotion.getCurrentAcceleration().then((acceleration : DeviceMotionAccelerationData) => { this.initial = acceleration; });
    if (this.model.x == 2.37 && this.model.y == 6.52) {
      return this.color = "red";
    }
    else { if(this.model.x == -2.37 && this.model.y == 6.52) {
      return this.color = "blue";}
    }

    if ( this.model.x == 0 && this.model.y==5.63) {
      return this.color="green";
    }
    else { if(this.model.x == 0 && this.model.y == 8.04) {
      return this.color= "yellow"; }
    }

  }
}


