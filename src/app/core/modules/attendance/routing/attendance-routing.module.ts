import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginGuard } from 'src/app/core/authentication/guards/login.guard';
import { AttendanceComponent } from './../attendance.component';

const routes: Routes = [
	{
		path: '',
		component: AttendanceComponent,
		title: 'الحضور والانصراف',
		canActivateChild: [LoginGuard],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class AttendanceRoutingModule { }
