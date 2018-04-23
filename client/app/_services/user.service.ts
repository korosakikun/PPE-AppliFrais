import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { User } from '../_models/index';

@Injectable()
export class UserService {
    user: any;
    constructor(private http: Http) { }

    //on recupere tout les utilisateur exepter les admin
    getAll() {
        return this.http.get('/users').map((response: Response) => response.json());
    }

    //on recupere via son id un utilisateur
    getById(_id: string) {
        return this.http.get('/users/' + _id).map((response: Response) => response.json());
    }

    //création d'un utilisateur
    create(user: User) {
        return this.http.post('/users/register', user);
    }

    //Update d'un utilisateur
    update(user: User) {
        return this.http.put('/users/' + user._id, user);
    }

    //Suppresion d'un utilisateur
    delete(_id: string) {
        return this.http.delete('/users/' + _id);
    }

    //récupere l'utilisateur courant
    getCurrent() {
    	return this.http.get('/users/current').map((response: Response) => response.json());
    }
}
