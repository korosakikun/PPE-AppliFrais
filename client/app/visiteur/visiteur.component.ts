import { Component } from '@angular/core';

@Component({
    moduleId: module.id,
    templateUrl: 'visiteur.component.html'
})

export class VisiteurComponent {
  currentUser: User;
  constructor(){
    this.currentUser = JSON.parse(localStorage.getItem('currentUser'));
  }

}
