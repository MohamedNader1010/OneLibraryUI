import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import { LoginGuard } from 'src/app/core/authentication/guards/login.guard';
import {ClientComponent} from '../client.component';
import { TeacherAccountComponent } from '../components/teacherAccount/teacherAccount.component'

const routes: Routes = [
	{
		path: '',
		component: ClientComponent,
		title: 'العملاء',
		canActivateChild: [LoginGuard],
		children: [
			{path: '', component: TeacherAccountComponent, title: 'حسابات المدرسين'},
			{path: '', redirectTo: 'all', pathMatch: 'full'},
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ClientRoutingModule {}
