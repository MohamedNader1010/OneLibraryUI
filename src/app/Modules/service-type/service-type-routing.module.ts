import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from '../../core/authentication/guards/login.guard';
import { ServiceTypeComponent } from './service-type.component';

const routes: Routes = [
  {
    path: '',
    component: ServiceTypeComponent,
    title: 'نوع الخدمة',
    canActivateChild: [LoginGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServiceTypesRoutingModule {}
