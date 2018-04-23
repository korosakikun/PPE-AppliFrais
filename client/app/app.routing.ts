import { Routes, RouterModule } from '@angular/router';

import { LoginComponent } from './login/index';
import { AuthGuard } from './_guards/index';
import { VisiteurModule } from './visiteur/visiteur.module'
import { AdminModule } from './admin/admin.module'
import { ComptableModule } from './comptable/comptable.module'

//on définie les route des différent modules et du login
const appRoutes: Routes = [
    { path: '', redirectTo: 'login', pathMatch: 'prefix'},
    { path: 'login', component: LoginComponent },
    { path: 'visiteur', loadChildren: "app/visiteur/visiteur.module#VisiteurModule", canActivate: [AuthGuard]},
    { path: 'comptable', loadChildren: "app/comptable/comptable.module#ComptableModule", canActivate: [AuthGuard]},
    { path: 'admin', loadChildren: "app/admin/admin.module#AdminModule", canActivate: [AuthGuard]},
    // otherwise redirect to home
    { path: '**', redirectTo: ''}
];

export const routing = RouterModule.forRoot(appRoutes);
