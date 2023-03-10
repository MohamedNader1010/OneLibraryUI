import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginGuard} from 'src/Modules/authentication.Module/guards/login.guard';
import {NotfoundComponent} from '../components/notfound/notfound.component';
import {ProfileComponent} from '../components/profile/profile.component';
import {SharedComponent} from '../shared.component';

const routes: Routes = [
	{
		path: '',
		component: SharedComponent,
		title: 'الرئيسية',
		children: [
			{path: 'services', loadChildren: () => import('../../service/service.module').then((m) => m.ServiceModule)},
			{path: 'orders', loadChildren: () => import('../../order/order.module').then((m) => m.OrderModule)},
			{path: 'materials', loadChildren: () => import('../../material/material.module').then((m) => m.MaterialModule)},
			{path: 'serviceTypes', loadChildren: () => import('../../serviceType/serviceType.module').then((m) => m.ServiceTypeModule)},
			{path: 'clients', loadChildren: () => import('../../client/client.module').then((m) => m.ClientModule)},
			{path: 'clientTypes', loadChildren: () => import('../../clientType/clientType.module').then((m) => m.ClientTypeModule)},
			{path: 'servicePrice', loadChildren: () => import('../../service-price-per-client-type/service-price-per-client-type.module').then((m) => m.ServicePricePerClientTypeModule)},
			{path: 'notes', loadChildren: () => import('../../note/note.module').then((m) => m.NoteModule)},
			{path: 'employees', loadChildren: () => import('../../employee/employee.module').then((m) => m.EmployeeModule)},
			{path: 'attendance', loadChildren: () => import('../../attendance/attendance.module').then((m) => m.AttendanceModule)},
			{path: 'feadback', loadChildren: () => import('../../feadback/feadback.module').then((m) => m.FeadbackModule)},
			{path: 'profile', component: ProfileComponent, title: 'حسابي الشخصي', canActivate: [LoginGuard]},
			// {path: '', redirectTo: '', pathMatch: 'full'},
		],
	},
	{path: '**', component: NotfoundComponent, title: '404 - not found'},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class SharedRoutingModule {}
