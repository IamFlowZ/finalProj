import { observeOn } from 'rxjs/operator/observeOn';
import { isSuccess } from '@angular/http/src/http_utils';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { UserLogin } from '../models/userLogin';
import { Lobby } from '../models/lobbyModel';
import { User } from '../models/userModel';
import 'rxjs/add/operator/retry';


@Injectable()
export class LobbyService {
private userUrl = "http://ec2-18-216-244-36.us-east-2.compute.amazonaws.com:3000/api/users";
private lobbyUrl = "http://ec2-18-216-244-36.us-east-2.compute.amazonaws.com:3000/api/lobbies";
private headers = new Headers ({'Content-type': 'application/json'});
lobby: Lobby;
user: User;

//could possibly, (should) write generic CRUD methods
  constructor(private http: Http) {

  }

  getLobby(id: number) {
    var lobbyURL = this.lobbyUrl + "/" + id;
    console.log("url being called: " + lobbyURL);
    return this.http.get(lobbyURL)
    .retry(5)
    .subscribe(data => {
      this.lobby = data.json();
      console.log("lobby recieved: " + this.lobby.lobbyId);
      // localStorage.setItem('lobby', JSON.stringify(this.lobby));
      localStorage.lobby = JSON.stringify(this.lobby);
    },
    (err => {
      if(err.error instanceof Error) {
        console.log('An error occured during lobby call: ', err.error.message);
      }
      else {
        console.log('Backend returned an error during lobby call: ${err.status}, body was ${err.error}');
      }
    }))
  }

  userLogin(username: string) {
    var userURL = this.userUrl + "/" + username;
    console.log("url being called: " + userURL);
    // var userCheck = localStorage.getItem('currentUser');
    // if(userCheck != null) {
    //   localStorage.remove('currentUser);
    // }
    // else {
      return this.http.get(userURL)
      .retry(5)
      .subscribe(data => {

        this.user = data.json();
        // console.log(this.user.userId);
        // localStorage.setItem('currentUser', JSON.stringify(this.user));
        localStorage.currentUser = JSON.stringify(this.user);
    },
    (err => {
      if(err.error instanceof Error) {
        console.log('An error occured during user call: ', err.error.message);
      }
      else {
        console.log('Backend returned an error during user call: ${err.status}, body was ${err.error}');
      }
      })
    )
  }

  postLobby(users: number[], prompts: string[], timer: number) {
    this.lobby.userIds = users;
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
