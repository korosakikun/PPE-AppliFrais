import { Injectable } from '@angular/core';
import { Http, Headers, Response } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/operator/map';
import { UserService } from './user.service';

@Injectable()
export class AuthenticationService {
    constructor(private http: Http, public userService: UserService) { }

    login(username: string, password: string) {
        return this.http.post('/users/authenticate', { username: username, password: password })
            .map((response: Response) => {
                // login successful if there's a jwt token in the response
                let user = response.json();
                if (user && user.token) {
                  this.userService.user = user;
                  // store user details and jwt token in local storage to keep user logged in between page refreshes
                  localStorage.setItem('currentUser', JSON.stringify(user));
                }
                this.userService.user = user;
                return user;
            });
    }

    logout() {
        // remove user from local storage to log user out
        localStorage.removeItem('currentUser');
        this.userService.user = {};
    }
}
