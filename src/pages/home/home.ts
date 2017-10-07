import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { GamePage } from '../game/game';


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})

export class HomePage {
  pushPageGame: any;


  constructor(public navCtrl: NavController) {
  this.pushPageGame = GamePage;


  }




}
