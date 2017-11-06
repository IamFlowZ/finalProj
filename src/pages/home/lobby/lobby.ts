import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GamePage } from '../../game/game/game';
import { Observable } from 'rxjs/Rx';

import { User } from '../../../app/models/userModel';
import { LobbyCreate } from '../../create/lobby/lobbyCreate';
import { LobbyService } from '../../../app/shared/app.server';
import { BackupUser } from '../../../app/shared/backupUers';
import { LobbyModel } from '../../../app/models/lobbyDisplay';

@Component({
  selector: 'page-home',
  templateUrl: 'lobby.html',
  providers: [LobbyService, BackupUser]
})

export class HomePage {
  pushPageGame: any;
  pushpageLobbyCreate: any;
  user: User;
  lobbyDisplay = new LobbyModel;
  message: any;
  lobbies: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private lobbyService: LobbyService,
    private backupUser: BackupUser ) {
    this.pushPageGame = GamePage;
    this.pushpageLobbyCreate = LobbyCreate;
    this.user = this.backupUser;

    //not so sure about this
    // const currentUser = navParams.get('user');

  }


  //needs work
  getLobbies() {
    this.lobbies = this.user.lobbyId;
    this.lobbies.forEach(lobbyId => {
      this.lobbyService.getLobby(lobbyId)
      .subscribe((response) => {
        this.lobbyDisplay = response;
      });
    });
  }

}
