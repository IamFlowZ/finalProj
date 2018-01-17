import { Component, style } from '@angular/core';
import { NavController, NavPush } from 'ionic-angular';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { UserLogin } from '../../../app/models/userLogin';
import { LobbyService } from '../../../app/shared/app.userService';
import { User } from '../../../app/models/userModel';
import { HomePage } from '../lobby/lobby';
import { GamePage } from '../../game/game/game';
import { UserCreate } from '../../create/user/userCreate';
//put orientation in the shared folder
import {Orientation} from '../../game/game/components/orientationTracker';


@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  styles: ['box-shadow'],
  providers: [LobbyService]
})


export class Login {
  model: any = {};
  pushPageLobby: any;
  pushPageGame: any;
  pushPageRegister: any;
  user: User;

  constructor(
    public navCtrl: NavController,
    private lobbyService: LobbyService) {
    this.pushPageGame = GamePage;
    this.pushPageLobby = HomePage;
    this.pushPageRegister = UserCreate;
  }


  userLogin() {
    this.lobbyService.userLogin(this.model.username);
    this.user = JSON.parse(localStorage.getItem('currentUser'));
    console.log("user login succesful. user: " + this.user.userId);
    this.navCtrl.push(this.pushPageLobby, {'currentUser': this.user});


  }
}
