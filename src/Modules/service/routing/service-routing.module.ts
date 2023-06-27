import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ServiceComponent} from '../service.component';
import {LoginGuard} from 'src/Modules/authentication.Module/guards/login.guard';

const routes: Routes = [
	{
		path: '',
		component: ServiceComponent,
		title: 'الخدمات',
		canActivateChild: [LoginGuard],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ServiceRoutingModule {}
