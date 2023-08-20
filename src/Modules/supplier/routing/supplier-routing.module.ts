import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SupplierComponent } from '../suppliers.component';
import { LoginGuard } from '../../authentication.Module/guards/login.guard';

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
