import { Component } from '@angular/core';
import { Router } from '@angular/router';

import { AlertService, UserService } from '../_services/index';

//composant permettant de crée un utilisateur
@Component({
  moduleId: module.id,
  templateUrl: 'createUser.component.html'
})

export class createUserComponent {
  model: any = {};
  loading = false;

  constructor(
    private router: Router,
    private userService: UserService,
    private alertService: AlertService) { }

  register() {
    this.loading = true;
    this.userService.create(this.model).subscribe(
      data => {
        //lorsque l'utilisateur est crée on redirige vers la liste des utilisateur
        this.alertService.success('Ajout d\'utilisateur effectué', true);
        this.router.navigate(['/admin']);
      },
      error => {
        this.alertService.error(error);
        this.loading = false;
      }
    );
  }

  resetForm() {
    this.model = {};
  }
}
