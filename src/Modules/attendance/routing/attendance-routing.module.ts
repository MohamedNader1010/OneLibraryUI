import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginGuard} from 'src/Modules/authentication.Module/guards/login.guard';
import {AllComponent} from '../components/all/all.component';
import {AttendanceComponent} from './../attendance.component';

const routes: Routes = [
	{
		path: '',
		component: AttendanceComponent,
		title: 'الحضور والانصراف',
		canActivateChild: [LoginGuard],
		children: [
			{path: 'all', component: AllComponent, title: 'الحضور والانصراف'},
			{path: '', redirectTo: 'all', pathMatch: 'full'},
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AttendanceRoutingModule {}
