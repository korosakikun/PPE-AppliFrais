import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions, Response } from '@angular/http';
import 'rxjs/add/operator/map'
import { User, ficheDeFrais, fraisForfait } from '../_models/index';

@Injectable()
export class ficheService {
  constructor(private http: Http) { }

  //création d'une fiche de frais
  create(ficheDeFrais: any) {
    return this.http.post('/ficheDeFrais/create', ficheDeFrais);
  }

  //modification d'une fiche de frais
  update(ficheDeFrais: ficheDeFrais) {
    return this.http.put('/ficheDeFrais/' + ficheDeFrais._id, ficheDeFrais);
  }

  //changement de l'état d'un frais forfait
  changeStateFrais(ficheId: string, fraiId: string, etat: string) {
    var param = { etat }
    return this.http.put('/ficheDeFrais/' + ficheId + '/' + fraiId, param);
  }

  changeStateFiches(ficheId: string, etat: string) {
    var param = { etat }
    return this.http.put('/ficheDeFrais/ficheEtat/' + ficheId, param);
  }

  changeStateFraisHorsForfait(ficheId: string, fraiId: string, etat: string) {
    var param = { etat }
    console.log("test");
    return this.http.put('/ficheDeFrais/horsForfait/' + ficheId + '/' + fraiId, param);
  }

  //récupere toutes les fiche de frais du visiteur passer en parametre
  getAllForUser(_id: any) {
    return this.http.post('/ficheDeFrais/getAllForUser', _id).map((response: Response) => response.json());
  }

  //recuperer toute les fiche de chaque visiteur trier dans l'ordre des visiteur
  getAll(){
    return this.http.post('/ficheDeFrais/getAll', '').map((response: Response) => response.json());
  }

  getAllNonTraite(){
    return this.http.post('/ficheDeFrais/getAllNonTraite', '').map((response: Response) => response.json());
  }

  deleteFrais(_id: string, _idFrai: string) {
    return this.http.delete('/ficheDeFrais/' + _id + '/' + _idFrai);
  }

  deleteFraisHorsForfait(_id: string, _idFrai: string) {
    return this.http.delete('/ficheDeFrais/horsForfait/' + _id + '/' + _idFrai);
  }

  //Ajoute un frais forfait à une fiche spécifier
  ajoutFrais(_id: string, fraisForfait: fraisForfait) {
    var param = { _id, fraisForfait };
    return this.http.put('/ficheDeFrais/ajoutFrais', param);
  }

  //Ajoute un frais hors forfait à une fiche spécifier
  ajoutFraisHorsForfait(_id: string, fraisHorsForfait: fraisForfait) {
    var param = { _id, fraisHorsForfait };
    return this.http.put('/ficheDeFrais/ajoutFraisHorsForfait', param);
  }
}
