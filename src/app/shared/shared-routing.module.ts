import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from '../core/authentication/guards/auth.guard';
import { BankGuard } from '../core/authentication/guards/bank.guard';
import { LoginGuard } from '../core/authentication/guards/login.guard';
import { TeacherAccountComponent } from '../Modules/client/components/teacherAccount/teacherAccount.component';
import { ReservationsComponent } from '../Modules/order/components/reservations/reservations.component';
import { ReturnsComponent } from '../Modules/order/components/returns/returns.component';
import { UnfinishedOrdersComponent } from '../Modules/order/components/unfinished-orders/unfinished-orders.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { NotfoundComponent } from './components/notfound/notfound.component';
import { ProfileComponent } from './components/profile/profile.component';
import { SharedComponent } from './shared.component';
import { ShiftsComponent } from '../Modules/shift/shifts.component';

const routes: Routes = [
  {
    path: '',
    component: SharedComponent,
    title: 'الرئيسية',
    children: [
      { path: 'services', loadChildren: () => import('../Modules/service/service.module').then((m) => m.ServiceModule), canActivate: [AuthGuard] },
      { path: 'orders', loadChildren: () => import('../Modules/order/order.module').then((m) => m.OrderModule) },
      { path: 'materials', loadChildren: () => import('../Modules/material/material.module').then((m) => m.MaterialModule), canActivate: [AuthGuard] },
      { path: 'serviceTypes', loadChildren: () => import('../Modules/service-type/service-type.module').then((m) => m.ServiceTypeModule), canActivate: [AuthGuard] },
      { path: 'clients', loadChildren: () => import('../Modules/client/client.module').then((m) => m.ClientModule), canActivate: [AuthGuard] },
      { path: 'clientTypes', loadChildren: () => import('../Modules/client-type/client-type.module').then((m) => m.ClientTypeModule), canActivate: [AuthGuard] },
      {
        path: 'servicePrice',
        loadChildren: () => import('../Modules/service-price-per-client-type/service-price-per-client-type.module').then((m) => m.ServicePricePerClientTypeModule),
        canActivate: [AuthGuard],
      },
      { path: 'notes', loadChildren: () => import('../Modules/note/note.module').then((m) => m.NoteModule), canActivate: [AuthGuard] },
      { path: 'employees', loadChildren: () => import('../Modules/employee/employee.module').then((m) => m.EmployeeModule), canActivate: [AuthGuard] },
      { path: 'attendance', loadChildren: () => import('../Modules/attendance/attendance.module').then((m) => m.AttendanceModule) },
      { path: 'feedback', loadChildren: () => import('../Modules/feadback/feedback.module').then((m) => m.FeedbackModule), canActivate: [AuthGuard] },
      { path: 'materialTracking', loadChildren: () => import('../Modules/material-tracking/materialTracking.module').then((m) => m.materialTrackingModule), canActivate: [AuthGuard] },
      { path: 'transactions', loadChildren: () => import('../Modules/incomes-outcomes/incomes-outcomes.module').then((m) => m.IncomesOutcomesModule), canActivate: [AuthGuard] },
      { path: 'commitmentAndDue', loadChildren: () => import('../Modules/commitment-and-due/commitment-and-due.module').then((m) => m.CommitmentAndDueModule), canActivate: [AuthGuard] },
      { path: 'bank', loadChildren: () => import('../Modules/bank/bank.module').then((m) => m.BankModule), canActivate: [BankGuard] },
      { path: 'profile', component: ProfileComponent, title: 'حسابي الشخصي', canActivate: [LoginGuard] },
      { path: 'returns', component: ReturnsComponent, title: 'المرتجعات', loadChildren: () => import('../Modules/order/order.module').then((m) => m.OrderModule), canActivate: [AuthGuard] },
      {
        path: 'unfinished-orders',
        component: UnfinishedOrdersComponent,
        title: 'الطلبات الغير مكتلمله',
        loadChildren: () => import('../Modules/order/order.module').then((m) => m.OrderModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'notesReservations',
        component: ReservationsComponent,
        title: 'الحجوزات',
        loadChildren: () => import('../Modules/order/order.module').then((m) => m.OrderModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'teacherAccount',
        component: TeacherAccountComponent,
        title: 'حسابات المدرسين',
        loadChildren: () => import('../Modules/client/client.module').then((m) => m.ClientModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'shifts',
        component: ShiftsComponent,
        title: 'الشيفتات',
        loadChildren: () => import('../Modules/shift/shifts.module').then((m) => m.ShiftsModule),
        canActivate: [AuthGuard],
      },
      { path: 'suppliers', loadChildren: () => import('../Modules/supplier/supplier.module').then((m) => m.SupplierModule), canActivate: [AuthGuard] },
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
