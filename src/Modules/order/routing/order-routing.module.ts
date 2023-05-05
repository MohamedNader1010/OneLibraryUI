import { ReturnsComponent } from './../components/returns/returns.component';
import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OrderComponent} from '../order.component';
import {TransactionComponent} from '../components/transaction/transaction.component';
import {LoginGuard} from 'src/Modules/authentication.Module/guards/login.guard';

const routes: Routes = [
	{
		path: '',
		component: OrderComponent,
		title: 'الطلبات',
		canActivateChild: [LoginGuard],
		children: [
			{path: 'transaction', component: TransactionComponent, title: 'تعاملات مالية علي الطلب'},
			{path: 'returns', component: ReturnsComponent, title: "المرتجعات"},
			// {path: 'details', component: DetailsComponent, title: 'تفاصيل الطلب'},
			{path: '', redirectTo: 'all', pathMatch: 'full'},
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class OrderRoutingModule {}
