import { Component, style } from '@angular/core';
import { NavController, NavPush } from 'ionic-angular';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { UserLogin } from '../../../app/shared/app.userLogin';
import { LobbyService } from '../../../app/shared/app.server';
import { User } from '../../../app/shared/app.userModel';
import { HomePage } from '../lobby/lobby';
import { GamePage } from '../../game/game/game';
import { UserCreate } from '../../create/user/userCreate';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [LobbyService]
})


export class Login {
  model: any = {};
  pushPageLobby: any;
  pushPageGame: any;
  pushPageRegister: any;

  constructor(
    public navCtrl: NavController,
    private lobbyService: LobbyService) {
    this.pushPageGame = GamePage;
    this.pushPageLobby = HomePage;
    this.pushPageRegister = UserCreate;
  }


  userLogin() {
    this.lobbyService.userLogin(this.model.username).subscribe(data => { this.navCtrl.push(HomePage, {currentUser: data});}, error => this.handleError);
    // if (this.loggedUser != null) {
      // this.navCtrl.push(HomePage, {currentUser: this.loggedUser});
    // }
    // else  {
    //   this.navCtrl.push(HomePage, {'user': this.backupUser});
    // }


  }
  private handleError(error: any): Promise<any> {
    console.error('error occured: ', error);
    return Promise.reject(error.message || error);
  }
}
