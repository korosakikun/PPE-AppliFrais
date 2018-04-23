import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { customHttpProvider } from '../_helpers/index';
import { AlertComponent } from '../_directives/index';
import { AuthGuard } from '../_guards/index';
import { AlertService, AuthenticationService, UserService } from '../_services/index';
import { VisiteurComponent } from './visiteur.component';
import { fraisForfaitComponent } from './fraisForfait.component';
import { fraisHorsForfaitComponent } from './fraisHorsForfait.component';

@NgModule({
    // on imports tout les modules par défaut et définie les routes avec leur composant liée
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(
          [
            { path: '', component: VisiteurComponent},
            { path: 'fraisForfait', component: fraisForfaitComponent},
            { path: 'fraisHorsForfait', component: fraisHorsForfaitComponent}
          ]
        )
    ],
    // on déclare chaque composant
    declarations: [
      VisiteurComponent,
      fraisForfaitComponent,
      fraisHorsForfaitComponent
    ],
})

export class VisiteurModule { }
