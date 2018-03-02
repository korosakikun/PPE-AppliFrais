import { Component, OnInit } from '@angular/core';
import { UserService } from '../_services/index';
import { User } from '../_models';

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

    ngOnInit() {
    }

    ngDoCheck() {
    	this.currentUser = this.userService.user;
    }
}