import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {LoginGuard} from 'src/Modules/authentication.Module/guards/login.guard';
import {ClientComponent} from '../client.component';
import {SingleComponent} from '../components/single/single.component';

const routes: Routes = [
	{
		path: '',
		component: ClientComponent,
		title: 'العملاء',
		canActivateChild: [LoginGuard],
		children: [
			{path: 'single', component: SingleComponent, title: 'بيانات العميل'},
			{path: '', redirectTo: 'all', pathMatch: 'full'},
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ClientRoutingModule {}
