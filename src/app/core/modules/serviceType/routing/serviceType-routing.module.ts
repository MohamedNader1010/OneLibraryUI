import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ServiceTypeComponent} from '../serviceType.component';
import { LoginGuard } from 'src/app/core/authentication/guards/login.guard';

const routes: Routes = [
	{
		path: '',
		component: ServiceTypeComponent,
		title: 'نوع الخدمة',
		canActivateChild: [LoginGuard],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ServiceTypesRoutingModule {}
