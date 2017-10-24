import { Component, style } from '@angular/core';
import { NavController, NavPush } from 'ionic-angular';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Rx';
import 'rxjs/add/operator/map';

import { UserLogin } from '../../../app/shared/app.userLogin';
import { LobbyService } from '../../../app/shared/app.server';
import { User } from '../../../app/shared/app.userModel';
import { HomePage } from '../lobby/lobby';

@Component({
  selector: 'page-login',
  templateUrl: 'login.html',
  providers: [LobbyService]
})


export class Login {
  user: UserLogin;
  loggedUser: User;
  pushPageLobby: any;

  constructor(
    public navCtrl: NavController,
    private http:Http,
    private lobbyService: LobbyService) {

  }

  userLogin(username: string) {
    this.lobbyService.submitUser(username).then(user => this.loggedUser = user);
    if (this.loggedUser != null) {
      this.navCtrl.push(HomePage, {'user': this.loggedUser});
    }
    else  {
      var message = document.getElementById("failedLogin");
      message.style.visibility="visible";
    }



  }


}
