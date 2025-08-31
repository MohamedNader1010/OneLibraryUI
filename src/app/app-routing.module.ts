import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { loginGuard } from './shared/guards/login.guard';
import { authGuard } from './shared/guards/auth.guard';

const routes: Routes = [
    {
        path: 'auth',
        loadChildren: () => import('./modules/authentication/auth.module').then((m) => m.AuthModule),
        canMatch: [loginGuard],
        canActivate: [loginGuard]
    },
    {
        path: '',
        loadChildren: () => import('./shared/shared.module').then((m) => m.SharedModule),
        canMatch: [authGuard],
        canActivate: [authGuard],
        canActivateChild: [authGuard]
    }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
