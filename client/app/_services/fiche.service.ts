import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';

import { User, ficheDeFrais } from '../_models/index';

@Injectable()
export class ficheService {
    constructor(private http: Http) { }

    getAll() {
        return this.http.get('/ficheDeFrais').map((response: Response) => response.json());
    }

    getById(_id: string) {
        return this.http.get('/ficheDeFrais/' + _id).map((response: Response) => response.json());
    }

    create(ficheDeFrais: any) {
        return this.http.post('/ficheDeFrais/create', ficheDeFrais);
    }

    update(ficheDeFrais: ficheDeFrais) {
        return this.http.put('/ficheDeFrais/' + ficheDeFrais._id, ficheDeFrais);
    }

    delete(_id: string) {
        return this.http.delete('/ficheDeFrais/' + _id);
    }
}
