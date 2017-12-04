import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';

import { customHttpProvider } from '../_helpers/index';
import { AlertComponent } from '../_directives/index';
import { AuthGuard } from '../_guards/index';
import { AlertService, AuthenticationService, UserService } from '../_services/index';
import { VisiteurComponent } from './visiteur.component';
import { TestComponent } from './test.component';

@NgModule({
    imports: [
        CommonModule,
        FormsModule,
        RouterModule.forChild(
          [
            { path: '', component: VisiteurComponent},
            { path: 'ficheDeFrais', component: TestComponent}
          ]
        )
    ],
    declarations: [
      VisiteurComponent,
      TestComponent
    ],
})

export class VisiteurModule { }
