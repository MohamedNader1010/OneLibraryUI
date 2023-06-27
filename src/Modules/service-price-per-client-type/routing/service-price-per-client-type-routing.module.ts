import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ServicePricePerClientTypeComponent} from '../service-price-per-client-Type.component';
import {LoginGuard} from '../../authentication.Module/guards/login.guard';

const routes: Routes = [
	{
		path: '',
		component: ServicePricePerClientTypeComponent,
		title: 'سعر الخدمة لكل فئة',
		canActivateChild: [LoginGuard],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ServicePricePerClientTypeRoutingModule {}
