import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from '../../../authentication/guards/login.guard';
import { ServicePricePerClientTypeComponent } from '../service-price-per-client-Type.component';

const routes: Routes = [
  {
    path: '',
    component: ServicePricePerClientTypeComponent,
    title: 'سعر الخدمة لكل فئة',
    canActivateChild: [LoginGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ServicePricePerClientTypeRoutingModule {}
