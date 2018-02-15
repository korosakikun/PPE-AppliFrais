import { Component } from '@angular/core';
import { User } from '../_models';

import { ficheService, AlertService, UserService } from '../_services/index';

@Component({
  moduleId: module.id,
  templateUrl: 'fraisForfait.component.html'
})

export class fraisForfaitComponent {
  currentUser: User;
  ficheDeFrais: any;
  types: any = [
    {
      nom: "restaurant",
      montant: 40
    }, {
      nom: "hotel",
      montant: 60
    }, {
      nom: 'mixte',
      montant: 100
    }
  ];
  montantTotal: number = 0;
  model: any = {};
  mois: any = ['janvier', 'fevrier', 'mars', 'avril', 'mai', 'juin', 'juillet', 'aout', 'septembre', 'octobre', 'novembre', 'decembre'];
  constructor(
    private ficheService: ficheService,
    private alertService: AlertService,
    private userService: UserService
  ) {
    this.currentUser = this.userService.user;
    this.ficheDeFrais = this.currentUser.fichesDeFrais;
    console.log(this.currentUser);
    this.types = [
      {
        nom: "restaurant",
        montant: 40
      }, {
        nom: "hotel",
        montant: 60
      }, {
        nom: 'mixte',
        montant: 100
      }
    ]
  }

  changeTotal() {
    if (this.model.nombre) {
      this.montantTotal = this.model.nombre * this.model.typeFrais.montant;
    }
  }

  ajoutFrais() {
    var ficheDeFrais = this.mois[new Date().getMonth()] + " " + (new Date().getFullYear());
    this.ficheService.ajoutFrais(this.currentUser._id, ficheDeFrais, this.model)
      .subscribe( data => {
        console.log(this.userService.user);
        this.userService.user.fichesDeFrais[this.userService.user.fichesDeFrais.length - 1].fraisForfait.push(this.model);
        this.alertService.success('frais crée avec succès', true);
      }, error => {
        this.alertService.error(error);
      })
  }

}
