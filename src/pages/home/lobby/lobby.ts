import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { Http } from '@angular/http';
import { GamePage } from '../../game/game/game';

import { User } from '../../../app/shared/app.userModel';

@Component({
  selector: 'page-home',
  templateUrl: 'lobby.html'
})

export class HomePage {
  pushPageGame: any;
  user: User;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private http:Http) {

    this.pushPageGame = GamePage;
    this.user = navParams.get('user');

  }



}
