import { Component } from '@angular/core';
import { User } from '../_models';

import { ficheService, AlertService, UserService } from '../_services/index';

@Component({
  moduleId: module.id,
  templateUrl: 'comptable.component.html'
})

export class ComptableComponent {
  currentUser: User;
  ficheDeFrais: any;
  constructor(
    private ficheService: ficheService,
    private alertService: AlertService,
    private userService: UserService
  ) {
    this.currentUser = this.userService.user;
    this.getAllFiches();
  }

  getAllFiches() {

  this.ficheService.getAll().subscribe(
      data => {
        this.ficheDeFrais = data;
        console.log(data);
      }
    )
  }
}
