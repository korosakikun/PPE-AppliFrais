import { Component } from '@angular/core';
import { User } from '../_models';

import { ficheService, AlertService, UserService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'visiteur.component.html'
})

export class VisiteurComponent {
  currentUser: User;
  constructor(
		private ficheService: ficheService,
		private alertService: AlertService,
		private userService: UserService
	){
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
		this.ficheDeFrais = this.currentUser.ficheDeFrais;
  }

	ficheCreate() {
		var mois = new Date().getMonth()+1;
			this.ficheService.create({mois, user: this.currentUser})
					.subscribe(
							data => {
									this.alertService.success('Fiche crée avec succès', true);
									this.currentUser.ficheDeFrais.push({ mois })
							},
							error => {
									this.alertService.error(error);
							}
						)
	}

}
