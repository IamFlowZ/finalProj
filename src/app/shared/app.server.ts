import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import { UserLogin } from './app.userLogin';
import { User } from './app.userModel';
import 'rxjs/add/operator/toPromise';


@Injectable()
export class LobbyService {
private userUrl = "http://localhost:3000/api/users";
private lobbyUrl = "http://localhost:3000/api/lobbies";
private headers = new Headers ({ 'Content-type': 'application/json'});

  constructor(private http: Http) {

  }

  getLobby(id: number) {
    var lobbyURL = this.lobbyUrl + "/" + id;
    return this.http.get(lobbyURL)
    .subscribe(response => response.json().data as User,
    err => {this.handleError}
    );
  }

  userLogin(username: string) {
    var userURL = this.userUrl + "/" + username;
    return this.http.get(userURL)
      .map(response => response.json().data as User,
      err => {this.handleError}
    );

  }

// userLogin(username: string): Promise<User> {
//     var userURL = this.userUrl + "/" + username;
//     return this.http.get(userURL)
//     .toPromise()
//     .then(response => response.json().data as User)
//     .catch(this.handleError);

// }

  private handleError(error: any): Promise<any> {
    console.error('error occured: ', error);
    return Promise.reject(error.message || error);
  }

}
