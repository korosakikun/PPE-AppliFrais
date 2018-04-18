import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map'
import { User, ficheDeFrais, fraisForfait } from '../_models/index';

@Injectable()
export class ficheService {
  constructor(private http: Http) { }

  create(ficheDeFrais: any) {
    return this.http.post('/ficheDeFrais/create', ficheDeFrais);
  }

  update(ficheDeFrais: ficheDeFrais) {
    return this.http.put('/ficheDeFrais/' + ficheDeFrais._id, ficheDeFrais);
  }

  getAllForUser(_id: any) {
    return this.http.post('/ficheDeFrais/getAllForUser', _id).map((response: Response) => response.json());
  }

  getAll(){
    return this.http.post('/ficheDeFrais/getAll', '').map((response: Response) => response.json());
  }

  delete(_id: string) {
    return this.http.delete('/ficheDeFrais/' + _id);
  }

  ajoutFrais(_id: string, fraisForfait: fraisForfait) {
    var param = { _id, fraisForfait };
    return this.http.put('/ficheDeFrais/ajoutFrais', param);
  }
  ajoutFraisHorsForfait(_id: string, fraisHorsForfait: fraisForfait) {
    var param = { _id, fraisHorsForfait };
    return this.http.put('/ficheDeFrais/ajoutFraisHorsForfait', param);
  }
}
