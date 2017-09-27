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
    var start = this.deviceMotion.getCurrentAcceleration().then((acceleration : DeviceMotionAccelerationData) => { this.initial = acceleration; });
    var subscription = this.deviceMotion.watchAcceleration().subscribe((acceleration: DeviceMotionAccelerationData) => { this.model = acceleration; });
    this.getColor();

  }

getColor() {
  switch (this.model) {
    case this.model.z >= this.initial.z: this.color= "blue"; break;

    case this.model.z <=this.initial.z: this.color="red"; break;

    // case this.model.z >=7: this.color="green"; break;
  }
}

}
