import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { GamePage } from '../../game/game/game';

import { User } from '../../../app/shared/app.userModel';
import { LobbyCreate } from '../../create/lobby/lobbyCreate';
import { LobbyService } from '../../../app/shared/app.server';

@Component({
  selector: 'page-home',
  templateUrl: 'lobby.html',
  providers: [LobbyService]
})

export class HomePage {
  pushPageGame: any;
  pushpageLobbyCreate: any;
  user: User;
  message: any;

  constructor(
    public navCtrl: NavController,
    public navParams: NavParams,
    private lobbyService: LobbyService ) {
    this.pushPageGame = GamePage;
    this.pushpageLobbyCreate = LobbyCreate;

    //not so sure about this
    const currentUser = navParams.get('user');

  }


  //needs work
  // getLobbies() {
  //   var lobbies = this.user.lobbyId;
  //   lobbies.forEach(userId => {
  //     this.lobbyService.getLobby(userId);
  //   });
  // }

}
