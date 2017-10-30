import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GamePage } from '../../game/game/game';

import { User } from '../../../app/shared/app.userModel';
import { BackupUser } from '../../../app/shared/app.backupUser';
import { LobbyService } from '../../../app/shared/app.server';

@Component({
  selector: 'page-home',
  templateUrl: 'lobby.html',
  providers: [LobbyService]
})

export class HomePage {
  pushPageGame: any;
  user: any;
  backupUser : BackupUser;
  message: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private lobbyService: LobbyService ) {
    this.pushPageGame = GamePage;
    this.user = this.navParams.get('user');
      if(this.user != null) {
        this.message = this.user;
      }
      else {this.message = "user call didn't work";}
  }


  //needs work
  getLobbies() {
    var lobbies = this.user.lobbyId;
    lobbies.forEach(userId => {
      this.lobbyService.getLobby(userId);
    });
  }

}
