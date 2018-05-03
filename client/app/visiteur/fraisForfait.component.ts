import { Component } from '@angular/core';
import { User } from '../_models';

import { ficheService, AlertService, UserService } from '../_services/index';

// Composant qui permet de rajouter des frais forfait au mois en cours
@Component({
  moduleId: module.id,
  templateUrl: 'fraisForfait.component.html'
})

export class fraisForfaitComponent {
  currentUser: User;
  ficheDeFrais: any;
  //Type de frais possible, rajouter ici si on veux des nouveaux frais forfait
  types: any = [];
  montantTotal: number = 0;
  model: any = {};
  constructor(
    private ficheService: ficheService,
    private alertService: AlertService,
    private userService: UserService
  ) {
    this.currentUser = this.userService.user;
    this.types = [
      {
        libelle: "restaurant",
        montant_unitaire: 40
      }, {
        libelle: "hotel",
        montant_unitaire: 60
      }, {
        libelle: 'mixte',
        montant_unitaire: 100
      }, {
        libelle: 'kilométrique',
        montant_unitaire: 0.5
      }
    ]
  }

  //Lors de la modification de la quantité ou du montant unitaire, le montant total ce met à jour
  changeTotal() {
    if (this.model.quantite) {
      this.montantTotal = this.model.quantite * this.model.type.montant_unitaire;
    }
  }

  //ajoute le frais a la fiche du mois en cours
  ajoutFrais() {
    //définie l'état du frais à nouveau
    this.model.etat = "Creer";
    // on envoie l'id de l'utilisateur actuel ainsi qu'un objet contenant toute les donner du frais
    this.ficheService.ajoutFrais(this.currentUser._id, this.model)
      .subscribe( data => {
        //si aucune erreur n'est arriver on affiche une notification de succès
        this.alertService.success('frais rajouter à ce mois', true);
      }, error => {
        // on affiche l'erreur.
        this.alertService.error(error);
      })
  }

}
