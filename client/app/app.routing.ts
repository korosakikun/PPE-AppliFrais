import { Routes, RouterModule } from '@angular/router';

import { HomeComponent } from './home/index';
import { LoginComponent } from './login/index';
import { RegisterComponent } from './register/index';
import { AuthGuard } from './_guards/index';
import { VisiteurModule } from './visiteur/visiteur.module'

const appRoutes: Routes = [
    { path: '', component: HomeComponent, canActivate: [AuthGuard] },
    { path: 'login', component: LoginComponent },
    { path: 'visiteur', loadChildren: "app/visiteur/visiteur.module#VisiteurModule", canActivate: [AuthGuard]},
    { path: 'comptable', loadChildren: "app/comptable/comptable.module#ComptableModule", canActivate: [AuthGuard]},
    { path: 'admin', loadChildren: "app/admin/admin.module#AdminModule", canActivate: [AuthGuard]},
    // otherwise redirect to home
    { path: '**', redirectTo: '' }
];

export const routing = RouterModule.forRoot(appRoutes);
