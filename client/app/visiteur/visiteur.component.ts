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
  mois : any = ['janvier', 'fevrier', 'mars', 'avril', 'mai', 'juin', 'juillet', 'aout', 'septembre', 'octobre', 'novembre', 'decembre']
  constructor(
    private ficheService: ficheService,
    private alertService: AlertService,
    private userService: UserService
  ) {

    this.currentUser = this.userService.user;
    this.ficheDeFrais = this.currentUser.fichesDeFrais;
  }

  ficheCreate() {
    var ficheDeFrais = this.mois[new Date().getMonth()] + " " + (new Date().getFullYear());
    this.ficheService.create({ date: ficheDeFrais, user: this.currentUser })
      .subscribe(
      data => {
        this.userService.user.fichesDeFrais.push({ficheDeFrais, fraisForfait: []});
        this.alertService.success('Fiche crée avec succès', true);
        console.log(this.userService.user);
      },
      error => {
        this.alertService.error(error);
      }
      )
  }

}
