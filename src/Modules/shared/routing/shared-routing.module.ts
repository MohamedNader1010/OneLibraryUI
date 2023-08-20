import {ReturnsComponent} from './../../order/components/returns/returns.component';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginGuard} from 'src/Modules/authentication.Module/guards/login.guard';
import {NotfoundComponent} from '../components/notfound/notfound.component';
import {ProfileComponent} from '../components/profile/profile.component';
import {DashboardComponent} from '../components/dashboard/dashboard.component';
import {SharedComponent} from '../shared.component';
import {ReservationsComponent} from 'src/Modules/order/components/reservations/reservations.component';
import { AuthGuard } from 'src/Modules/authentication.Module/guards/auth.guard';
import { TeacherAccountComponent } from 'src/Modules/client/components/teacherAccount/teacherAccount.component'
import { ShiftsComponent } from "../../incomes-outcomes/components/shifts/shifts.component"
import { ShiftDetailsComponent } from "../../incomes-outcomes/components/shift-details/shift-details.component";

const routes: Routes = [
  {
    path: '',
    component: SharedComponent,
    title: 'الرئيسية',
    children: [
      { path: 'services', loadChildren: () => import('../../service/service.module').then((m) => m.ServiceModule), canActivate: [AuthGuard] },
      { path: 'orders', loadChildren: () => import('../../order/order.module').then((m) => m.OrderModule) },
      { path: 'materials', loadChildren: () => import('../../material/material.module').then((m) => m.MaterialModule), canActivate: [AuthGuard] },
      { path: 'serviceTypes', loadChildren: () => import('../../serviceType/serviceType.module').then((m) => m.ServiceTypeModule), canActivate: [AuthGuard] },
      { path: 'clients', loadChildren: () => import('../../client/client.module').then((m) => m.ClientModule), canActivate: [AuthGuard] },
      { path: 'clientTypes', loadChildren: () => import('../../clientType/clientType.module').then((m) => m.ClientTypeModule), canActivate: [AuthGuard] },
      {
        path: 'servicePrice',
        loadChildren: () => import('../../service-price-per-client-type/service-price-per-client-type.module').then((m) => m.ServicePricePerClientTypeModule),
        canActivate: [AuthGuard],
      },
      { path: 'notes', loadChildren: () => import('../../note/note.module').then((m) => m.NoteModule), canActivate: [AuthGuard] },
      { path: 'employees', loadChildren: () => import('../../employee/employee.module').then((m) => m.EmployeeModule), canActivate: [AuthGuard] },
      { path: 'attendance', loadChildren: () => import('../../attendance/attendance.module').then((m) => m.AttendanceModule) },
      { path: 'feadback', loadChildren: () => import('../../feadback/feadback.module').then((m) => m.FeadbackModule), canActivate: [AuthGuard] },
      { path: 'materialTracking', loadChildren: () => import('../../material-tracking/materialTracking.module').then((m) => m.materialTrackingModule), canActivate: [AuthGuard] },
      { path: 'imcomesOutcomes', loadChildren: () => import('../../incomes-outcomes/incomes-outcomes.module').then((m) => m.IncomesOutcomesModule), canActivate: [AuthGuard] },
      { path: 'bank', loadChildren: () => import('../../bank/bank.module').then((m) => m.BankModule), canActivate: [AuthGuard] },
      { path: 'profile', component: ProfileComponent, title: 'حسابي الشخصي', canActivate: [LoginGuard] },
      { path: 'returns', component: ReturnsComponent, title: 'المرتجعات', loadChildren: () => import('../../order/order.module').then((m) => m.OrderModule), canActivate: [AuthGuard] },
      { path: 'notesReservations', component: ReservationsComponent, title: 'الحجوزات', loadChildren: () => import('../../order/order.module').then((m) => m.OrderModule), canActivate: [AuthGuard] },
      {
        path: 'teacherAccount',
        component: TeacherAccountComponent,
        title: 'حسابات المدرسين',
        loadChildren: () => import('../../client/client.module').then((m) => m.ClientModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'shifts/details/:id',
        component: ShiftDetailsComponent,
        title: 'الشيفتات',
        loadChildren: () => import('../../incomes-outcomes/incomes-outcomes.module').then((m) => m.IncomesOutcomesModule),
        canActivate: [AuthGuard],
      },
      {
        path: 'shifts',
        component: ShiftsComponent,
        title: 'الشيفتات',
        loadChildren: () => import('../../incomes-outcomes/incomes-outcomes.module').then((m) => m.IncomesOutcomesModule),
        canActivate: [AuthGuard],
      },
      { path: 'suppliers', loadChildren: () => import('../../supplier/supplier.module').then((m) => m.SupplierModule), canActivate: [AuthGuard] },
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
