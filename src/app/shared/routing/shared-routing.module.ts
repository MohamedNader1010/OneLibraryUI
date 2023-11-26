import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../../core/authentication/guards/auth.guard';
import { BankGuard } from '../../core/authentication/guards/bank.guard';
import { LoginGuard } from '../../core/authentication/guards/login.guard';
import { TeacherAccountComponent } from '../../core/modules/client/components/teacherAccount/teacherAccount.component';
import { ShiftDetailsComponent } from '../../core/modules/incomes-outcomes/components/shift-details/shift-details.component';
import { ShiftsComponent } from '../../core/modules/incomes-outcomes/components/shifts/shifts.component';
import { ReservationsComponent } from '../../core/modules/order/components/reservations/reservations.component';
import { ReturnsComponent } from '../../core/modules/order/components/returns/returns.component';
import { DashboardComponent } from '../components/dashboard/dashboard.component';
import { NotfoundComponent } from '../components/notfound/notfound.component';
import { ProfileComponent } from '../components/profile/profile.component';
import { SharedComponent } from '../shared.component';

const routes: Routes = [
  {
    path: '',
    component: SharedComponent,
    title: 'الرئيسية',
    children: [
      { path: 'services', loadChildren: () => import('../../core/modules/service/service.module').then((m) => m.ServiceModule), canActivate: [AuthGuard] },
      { path: 'orders', loadChildren: () => import('../../core/modules/order/order.module').then((m) => m.OrderModule) },
      { path: 'materials', loadChildren: () => import('../../core/modules/material/material.module').then((m) => m.MaterialModule), canActivate: [AuthGuard] },
      { path: 'serviceTypes', loadChildren: () => import('../../core/modules/serviceType/serviceType.module').then((m) => m.ServiceTypeModule), canActivate: [AuthGuard] },
      { path: 'clients', loadChildren: () => import('../../core/modules/client/client.module').then((m) => m.ClientModule), canActivate: [AuthGuard] },
      { path: 'clientTypes', loadChildren: () => import('../../core/modules/clientType/clientType.module').then((m) => m.ClientTypeModule), canActivate: [AuthGuard] },
      {
        path: 'servicePrice',
        loadChildren: () => import('../../core/modules/service-price-per-client-type/service-price-per-client-type.module').then((m) => m.ServicePricePerClientTypeModule),
        canActivate: [AuthGuard],
      },
      { path: 'notes', loadChildren: () => import('../../core/modules/note/note.module').then((m) => m.NoteModule), canActivate: [AuthGuard] },
      { path: 'employees', loadChildren: () => import('../../core/modules/employee/employee.module').then((m) => m.EmployeeModule), canActivate: [AuthGuard] },
      { path: 'attendance', loadChildren: () => import('../../core/modules/attendance/attendance.module').then((m) => m.AttendanceModule) },
      { path: 'feadback', loadChildren: () => import('../../core/modules/feadback/feadback.module').then((m) => m.FeadbackModule), canActivate: [AuthGuard] },
      { path: 'materialTracking', loadChildren: () => import('../../core/modules/material-tracking/materialTracking.module').then((m) => m.materialTrackingModule), canActivate: [AuthGuard] },
      { path: 'imcomesOutcomes', loadChildren: () => import('../../core/modules/incomes-outcomes/incomes-outcomes.module').then((m) => m.IncomesOutcomesModule), canActivate: [AuthGuard] },
      { path: 'commitmentAndDue', loadChildren: () => import('../../core/modules/commitment-and-due/commitment-and-due.module').then((m) => m.CommitmentAndDueModule), canActivate: [AuthGuard] },
      { path: 'bank', loadChildren: () => import('../../core/modules/bank/bank.module').then((m) => m.BankModule), canActivate: [BankGuard] },
      { path: 'profile', component: ProfileComponent, title: 'حسابي الشخصي', canActivate: [LoginGuard] },
      { path: 'returns', component: ReturnsComponent, title: 'المرتجعات', loadChildren: () => import('../../core/modules/order/order.module').then((m) => m.OrderModule), canActivate: [AuthGuard] },
      {
        path: 'notesReservations',
        component: ReservationsComponent,
        title: 'الحجوزات',
        loadChildren: () => import('../../core/modules/order/order.module').then((m) => m.OrderModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'teacherAccount',
        component: TeacherAccountComponent,
        title: 'حسابات المدرسين',
        loadChildren: () => import('../../core/modules/client/client.module').then((m) => m.ClientModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'shifts/details/:id',
        component: ShiftDetailsComponent,
        title: 'الشيفتات',
        loadChildren: () => import('../../core/modules/incomes-outcomes/incomes-outcomes.module').then((m) => m.IncomesOutcomesModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'shifts',
        component: ShiftsComponent,
        title: 'الشيفتات',
        loadChildren: () => import('../../core/modules/incomes-outcomes/incomes-outcomes.module').then((m) => m.IncomesOutcomesModule),
        canActivate: [AuthGuard],
      },
      { path: 'suppliers', loadChildren: () => import('../../core/modules/supplier/supplier.module').then((m) => m.SupplierModule), canActivate: [AuthGuard] },
      { path: 'dashboard', component: DashboardComponent, canActivate: [AuthGuard] },
      { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
    ],
  },
  { path: '**', component: NotfoundComponent, title: '404 - not found' },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class SharedRoutingModule {}
