import { isSuccess } from '@angular/http/src/http_utils';
import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { UserLogin } from '../models/userLogin';
import { Lobby } from '../models/lobbyModel';
import { User } from '../models/userModel';
import 'rxjs/add/operator/toPromise';


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
    return this.http.get(userURL)
      .map((response: Response) => response.json() as User,
      // err => {this.handleError}
    );
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
