import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import 'rxjs/add/operator/toPromise';
import { UserLogin } from './app.userLogin';
import { User } from './app.userModel';

const url = "http://localhost:3000/api/users";

@Injectable()
export class LobbyService {

  constructor(private http: Http) {

  }

  getLobby(): Promise<User[]> {
    return this.http.get(url).toPromise()
    .then(response => response.json().data as User[])
    .catch(this.handleError);
  }

  submitUser(username: string): Promise<User> {
    return this.http.get(url + '/' + username).toPromise()
    .then(response => response.json().data as User)
    .catch(this.handleError);
  }

  private handleError(error: any): Promise<any> {
    console.error('error occured: ', error);
    return Promise.reject(error.message || error);
  }

}
