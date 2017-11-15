import { observeOn } from 'rxjs/operator/observeOn';
import { isSuccess } from '@angular/http/src/http_utils';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { UserLogin } from '../models/userLogin';
import { Lobby } from '../models/lobbyModel';
import { User } from '../models/userModel';
// import { Delay } from './delayService';
import 'rxjs/add/operator/toPromise';
import 'rxjs/add/operator/retry';


@Injectable()
export class LobbyService {
private userUrl = "http://localhost:3000/api/users";
private lobbyUrl = "http://localhost:3000/api/lobbies";
private headers = new Headers ({ 'Content-type': 'application/json'});
lobby: Lobby;
user: User;

  constructor(private http: Http) {

  }

  getLobby(id: number) {
    var lobbyURL = this.lobbyUrl + "/" + id;
    return this.http.get(lobbyURL)
    .map((response: Response) => response.json().data as Lobby);
    // err => {this.handleError}
  }

  userLogin(username: string) {
    var userURL = this.userUrl + "/" + username;
    console.log("url being called: " + userURL);
    this.http.get(userURL)
    .retry(5)
    .subscribe(data => {
      console.log(data);
      // this.user.userId = data['userId'];
    },
    (err => {
      if(err.error instanceof Error) {
        console.log('An error occured: ', err.error.message);
      }
      else {
        console.log('Backend returned code ${err.status}, body was ${err.error}');
      }
    })
    )
      // .map((response: Response) => response.json() as User);
      // err => {this.handleError};
  }

  postLobby(user: number[], prompts: string[], timer: number) {
    this.lobby.Users = user;
    this.lobby.prompts = prompts;
    this.lobby.gameTimer = timer;
    this.http.post(this.lobbyUrl, this.lobby);
  }

  postUser(userId: number) {
    this.user.userId = userId;
    this.http.post(this.userUrl, this.user);
  }

  private handleError(error: any): Promise<any> {
    console.error('error occured: ', error);
    return Promise.reject(error.message || error);
  }

}
