import { LoginGuard } from './core/authentication/guards/login.guard';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'auth',
    loadChildren: () => import('./core/authentication/auth.module').then((m) => m.AuthModule),
  },
  {
    path: '',
    loadChildren: () => import('./shared/shared.module').then((m) => m.SharedModule),
    canLoad: [LoginGuard],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
