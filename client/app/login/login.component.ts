import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

import { AlertService, AuthenticationService } from '../_services/index';

@Component({
    moduleId: module.id,
    templateUrl: 'login.component.html'
})

export class LoginComponent implements OnInit {
    model: any = {};
    loading = false;
    returnUrl: string;

    constructor(
        private route: ActivatedRoute,
        private router: Router,
        private authenticationService: AuthenticationService,
        private alertService: AlertService) { }

    ngOnInit() {
        // reset login status
        // si on revient au login on utilise la fonction logout pour nous déconnecter
        this.authenticationService.logout();

        // get return url from route parameters or default to '/'
        this.returnUrl = this.route.snapshot.queryParams['returnUrl'] || '/';
    }

    login() {
        this.loading = true;
        //on envoie a la fonction login, le login et le password de l'utilisateur
        this.authenticationService.login(this.model.Login, this.model.password)
            .subscribe(
                //si succes on redirige selon le type d'utilisateur
                data => {
                    switch (data.type) {
                      case 'visiteur':
                        this.router.navigate(["/visiteur"]);
                        break;
                      case 'comptable':
                        this.router.navigate(['/comptable']);
                        break;
                      case 'admin':
                        this.router.navigate(['/admin']);
                    }
                },
                //sinon on affiche l'erreur
                error => {
                    this.alertService.error(error);
                    this.loading = false;
                });
    }
}
