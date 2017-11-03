import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LobbyService } from '../../../app/shared/app.server';

import { HomePage } from '../../home/lobby/lobby';
import { GamePage } from '../../game/game/game';
import { User } from '../../../app/shared/app.userModel';

@Component({
  selector: 'page-create-user',
  templateUrl: 'userCreate.html',
  providers: [LobbyService]
})


export class UserCreate {

  constructor(
    public navCtrl: NavController,
    private lobbyService: LobbyService) {

  }


}
