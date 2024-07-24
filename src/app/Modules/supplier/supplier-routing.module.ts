import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from '../../core/authentication/guards/login.guard';
import { SupplierComponent } from './suppliers.component';

const routes: Routes = [
  {
    path: '',
    component: SupplierComponent,
    title: 'الموردين',
    canActivateChild: [LoginGuard],
  },
];
@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SupplierRoutingModule {}
