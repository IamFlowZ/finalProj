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
  user: User;

  constructor(
    public navCtrl: NavController,
    private lobbyService: LobbyService) {
    this.pushPageGame = GamePage;
    this.pushPageLobby = HomePage;
    this.pushPageRegister = UserCreate;
  }


  userLogin() {
    this.lobbyService.userLogin(this.model.username)
    //   .subscribe(data => {
    //     // JSON.stringify(data);
    //     this.user.userId = data['userId'];
    //     console.log(this.user.userId);
    //     // JSON.stringify(data);
    //     // console.log(data);
    //   },
    //   (err => {
    //       if(err.error instanceof Error) {rr.error.message);
    //       }
    //         console.log('An error occured: ', e
    //       else {
    //         console.log('Backend returned code ${err.status}, body was ${err.error}');
    //       }
    //     })
    // );
      //   // JSON.stringify(data);
      //   this.navCtrl.push(HomePage, {currentUser: data}); });
      // this.navCtrl.push(HomePage, {currentUser: data});},
      // error => this.handleError);



  }
}
