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
  lobby: Lobby;
  _lobbies: Lobby[] = [];
  message: any;
  // lobbies: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private lobbyService: LobbyService,
    private backupUser: BackupUser ) {
    this.pushPageGame = GamePage;
    this.pushPageLobbyCreate = LobbyCreate;

  }

  ngOnInit() {
    this.user = this.navParams.get('currentUser');
    console.log("navParams passed this user: " + this.user.userId);
    this.getLobbies();
  }

  //needs work
  getLobbies() {
    const lobbies = this.user.lobbyId;
    lobbies.forEach(lobbyId => {
      this.lobbyService.getLobby(lobbyId);
      // this.lobby = JSON.parse(localStorage.getItem('lobby'));
      // console.log("lobby being called: " + this.lobby.lobbyId);
      this._lobbies.push(JSON.parse(localStorage.getItem('lobby')));
      for(var i=0; i < this._lobbies.length; i++) {
        console.log("array at " + i + " contains: "+ this._lobbies[i].lobbyId);
      }
      // localStorage.removeItem('lobby');
    });

  }

}
