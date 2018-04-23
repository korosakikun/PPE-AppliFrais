import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/index';
import { User } from '../_models';

//composant pour le menu
@Component({
    moduleId: module.id,
    selector: 'menu',
    templateUrl: 'menu.component.html'
})

export class MenuComponent {
	currentUser: User;

    constructor(private userService: UserService) {
    	this.currentUser = this.userService.user;
    }

    ngDoCheck() {
    	this.currentUser = this.userService.user;
    }
}
