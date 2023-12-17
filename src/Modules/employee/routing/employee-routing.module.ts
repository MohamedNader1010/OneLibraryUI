import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeComponent } from '../employee.component';
import { LoginGuard } from 'src/Modules/authentication.Module/guards/login.guard';
import { BankGuard } from '../../authentication.Module/guards/bank.guard';

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
export class EmployeeRoutingModule { }
