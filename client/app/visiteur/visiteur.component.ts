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
    this.ficheDeFrais = [];
    this.ficheCreate();
  }

  ficheCreate() {
    this.ficheService.create({ date: new Date(), user: this.currentUser })
      .subscribe(
      data => {
        this.ficheService.getAllForUser({_id: this.currentUser._id}).subscribe(
          data => {
            this.ficheDeFrais = data.reverse();
            this.ficheDeFrais.forEach((ficheDeFrais: any)=> {
              ficheDeFrais.mois = this.mois[ficheDeFrais.mois];
            })
          }
        )
      },
      error => {
        this.alertService.error(error);
      }
      )
  }

}
