import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LobbyService } from '../../../app/shared/app.userService';

import { HomePage } from '../../home/lobby/lobby';
import { GamePage } from '../../game/game/game';
import { User } from '../../../app/models/userModel';
import { UserLogin } from '../../../app/models/userLogin';

@Component({
  selector: 'page-create-user',
  templateUrl: 'userCreate.html',
  providers: [LobbyService]
})


export class UserCreate {
model : any = {};
pushPageLobby: any;

  constructor(
    public navCtrl: NavController,
    private lobbyService: LobbyService) {
    this.pushPageLobby = HomePage;

  }

  createUser() {
    this.lobbyService.postUser(this.model.username);
  }

}
