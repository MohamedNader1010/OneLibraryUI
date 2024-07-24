import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from '../../core/authentication/guards/login.guard';
import { ServiceComponent } from './service.component';

const routes: Routes = [
  {
    path: '',
    component: ServiceComponent,
    title: 'الخدمات',
    canActivateChild: [LoginGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServiceRoutingModule {}
