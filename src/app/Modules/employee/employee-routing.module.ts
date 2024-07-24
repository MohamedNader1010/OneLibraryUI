import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeComponent } from './employee.component';
import { BankGuard } from '../../core/authentication/guards/bank.guard';
import { LoginGuard } from '../../core/authentication/guards/login.guard';

const routes: Routes = [
  {
    path: '',
    component: EmployeeComponent,
    title: 'الموظفون',
    canActivate: [LoginGuard, BankGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class EmployeeRoutingModule {}
