import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OrderComponent} from '../order.component';
import { LoginGuard } from 'src/app/core/authentication/guards/login.guard';

const routes: Routes = [
	{
		path: '',
		component: OrderComponent,
		title: 'الطلبات',
		canActivateChild: [LoginGuard],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class OrderRoutingModule {}
