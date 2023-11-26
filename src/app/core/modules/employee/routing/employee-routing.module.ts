import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeComponent } from '../employee.component';
import { LoginGuard } from 'src/app/core/authentication/guards/login.guard';

const routes: Routes = [
  {
    path: '',
    component: EmployeeComponent,
    title: 'الموظفون',
    canActivate: [LoginGuard],
  },
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class EmployeeRoutingModule { }
