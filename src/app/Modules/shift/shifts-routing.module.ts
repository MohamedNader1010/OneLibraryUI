import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from '../../core/authentication/guards/login.guard';
import { AuthGuard } from '../../core/authentication/guards/auth.guard';
import { ShiftDetailsComponent } from './components/shift-details/shift-details.component';
import { ShiftsListComponent } from './components/shifts-list/shifts-list.component';

const routes: Routes = [
  {
    path: 'details/:id',
    component: ShiftDetailsComponent,
    title: 'تفاصيل الشيفت',
    canActivate: [AuthGuard],
  },
  {
    path: '',
    component: ShiftsListComponent,
    title: 'الشيفتات',
    canActivateChild: [LoginGuard],
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class ShiftsRoutingModule {}
