import { Component, style } from '@angular/core';
import { NavController, NavPush } from 'ionic-angular';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { UserLogin } from '../../../app/shared/app.userLogin';
import { LobbyService } from '../../../app/shared/app.server';
import { User } from '../../../app/shared/app.userModel';
import { HomePage } from '../lobby/lobby';
import { GamePage } from '../../game/game/game';
import { BackupUser } from '../../../app/shared/app.backupUser'

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [LobbyService]
})


export class Login {
  user: UserLogin;
  loggedUser: User;
  pushPageLobby: any;
  pushPageGame: any;
  backupUser: BackupUser;

  constructor(
    public navCtrl: NavController,
    private lobbyService: LobbyService) {
    this.pushPageGame = GamePage;
    this.pushPageLobby = HomePage;
  }


  userLogin() {
    this.lobbyService.userLogin(this.user.username);
    if (this.loggedUser != null) {
      this.navCtrl.push(HomePage, {'user': this.loggedUser});
    }
    else  {
      this.navCtrl.push(HomePage, {'user': this.backupUser});
    }

  }

}
