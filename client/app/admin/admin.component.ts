import { Component } from '@angular/core';
import { User } from '../_models';

import { ficheService, AlertService, UserService } from '../_services/index';

@Component({
  moduleId: module.id,
  templateUrl: 'admin.component.html'
})

export class AdminComponent {
  currentUser: User;
  users: User[] = [];
  ficheDeFrais: any;
  constructor(
    private alertService: AlertService,
    private userService: UserService
  ) {
    this.currentUser = this.userService.user;
  }

  ngOnInit() {
    this.loadAllUsers();
  }

  //on récupere la liste de tout les utilisateur excepter les administrateur
  private loadAllUsers() {
      this.userService.getAll().subscribe(users => { this.users = users; });
  }

  deleteUser(_id: string) {
    this.userService.delete(_id).subscribe(() => { this.loadAllUsers() });
  }
}
