import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { Lobby } from '../../../app/shared/app.lobbyModel'
import { LobbyService } from '../../../app/shared/app.server'

@Component({
  selector: 'page-create-lobby',
  templateUrl: 'lobbyCreate.html'
})


export class LobbyCreate {
  newLobby = new Lobby;
  prompts: number[] = [5, 10, 15];

  constructor (private navCtrl: NavController, private lobbyService: LobbyService) {



  }



}
