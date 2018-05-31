import { Component } from '@angular/core';
import { User } from '../_models';
import { ficheService, AlertService, UserService } from '../_services/index';
@Component({
  moduleId: module.id,
  templateUrl: 'visiteur.component.html'
})

export class VisiteurComponent {
  currentUser: User;
  ficheDeFrais: any;
  //Permet d'afficher le nom du mois pour chaque fiche de frais
  mois : any = ['janvier', 'fevrier', 'mars', 'avril', 'mai', 'juin', 'juillet', 'aout', 'septembre', 'octobre', 'novembre', 'decembre']
  constructor(
    private ficheService: ficheService,
    private alertService: AlertService,
    private userService: UserService
  ) {
    this.currentUser = this.userService.user;
    this.ficheDeFrais = [];
    //on crée une fiche de frais a la connexion du visiteur
    this.ficheCreate();
  }

  //permet de crée une fiche de frais, et de récupérer toute les fiches du visiteur
  ficheCreate() {
    //crée la fiche
    this.ficheService.create({ date: new Date(), user: this.currentUser })
      .subscribe(
      data => {
        // récupére tout les fiche du visiteur
        this.ficheService.getAllForUser({_id: this.currentUser._id}).subscribe(
          data => {
            //on inverse le tableau pour récupérer du plus récent au plus vieux
            this.ficheDeFrais = data.reverse();
            //on modifie l'attribut mois des fiches de frais pour afficher son nom
            this.ficheDeFrais.forEach((ficheDeFrais: any)=> {
              ficheDeFrais.mois = this.mois[ficheDeFrais.mois];
              console.log(ficheDeFrais);
            })
          }
        )
      },
      error => {
        this.alertService.error(error);
      }
      )
  }

  deleteFrais(_id: string, _idFrai: string) {
    this.ficheService.deleteFrais(_id, _idFrai).subscribe(() => { this.ficheCreate() });
  }

  deleteFraisHorsForfait(_id: string, _idFrai: string) {
    this.ficheService.deleteFraisHorsForfait(_id, _idFrai).subscribe(() => { this.ficheCreate() });
  }



}
