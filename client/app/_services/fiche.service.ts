import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map'
import { User, ficheDeFrais, fraisForfait } from '../_models/index';

@Injectable()
export class ficheService {
    constructor(private http: Http) { }

    create(ficheDeFrais: any) {
        return this.http.put('/ficheDeFrais/create', ficheDeFrais);
    }

    update(ficheDeFrais: ficheDeFrais) {
        return this.http.put('/ficheDeFrais/' + ficheDeFrais._id, ficheDeFrais);
    }

    delete(_id: string) {
        return this.http.delete('/ficheDeFrais/' + _id);
    }

    ajoutFrais(_id: string, date: string, fraisForfait: fraisForfait) {
      var param = { _id, date, fraisForfait };
      return this.http.put('/ficheDeFrais/ajoutFrais', param);
    }
}
