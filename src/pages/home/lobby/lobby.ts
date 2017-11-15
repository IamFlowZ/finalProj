import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GamePage } from '../../game/game/game';
import { Observable } from 'rxjs/Rx';

import { User } from '../../../app/models/userModel';
import { LobbyCreate } from '../../create/lobby/lobbyCreate';
import { LobbyService } from '../../../app/shared/app.userService';
import { BackupUser } from '../../../app/shared/backupUers';
import { LobbyModel } from '../../../app/models/lobbyDisplay';
import { Lobby } from '../../../app/models/lobbyModel';

@Component({
  selector: 'page-home',
  templateUrl: 'lobby.html',
  providers: [LobbyService, BackupUser]
})

export class HomePage {
  pushPageGame: any;
  pushPageLobbyCreate: any;
  user: User;
  lobbyDisplay = new Lobby;
  message: any;
  // lobbies: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private lobbyService: LobbyService,
    private backupUser: BackupUser ) {
    this.pushPageGame = GamePage;
    this.pushPageLobbyCreate = LobbyCreate;


    //not so sure about this
    // const currentUser = navParams.get('user');

  }

  ngOnInit() {

    this.getLobbies();
  }

  //needs work
  getLobbies() {
    this.user = this.backupUser;
    const lobbies = this.user.lobbyId;
    lobbies.forEach(lobbyId => {
      this.lobbyService.getLobby(lobbyId)
      .subscribe((response) => {
        this.lobbyDisplay = response;
      });
    });
  }

}
