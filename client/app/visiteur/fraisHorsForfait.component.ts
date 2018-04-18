import { Component } from '@angular/core';
import { User } from '../_models';

import { ficheService, AlertService, UserService } from '../_services/index';

@Component({
  moduleId: module.id,
  templateUrl: 'fraisHorsForfait.component.html'
})

export class fraisHorsForfaitComponent {
  currentUser: User;
  ficheDeFrais: any;
  montantTotal: number = 0;
  model: any = {};
  constructor(
    private ficheService: ficheService,
    private alertService: AlertService,
    private userService: UserService
  ) {
    this.currentUser = this.userService.user;
    this.model.type = {};
  }

  changeTotal() {
    if (this.model.quantite) {
      this.montantTotal = this.model.quantite * this.model.type.montant_unitaire;
    }
  }

  ajoutFraisHorsForfait() {
    this.ficheService.ajoutFraisHorsForfait(this.currentUser._id, this.model)
      .subscribe( data => {
        this.alertService.success('frais hors forfait crée avec succès', true);
      }, error => {
        this.alertService.error(error);
      })
  }

}
