import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OrderComponent} from '../order.component';
import {AllComponent} from '../components/all/all.component';
import {AddEditComponent} from '../components/add-edit/add-edit.component';
import {DetailsComponent} from '../components/details/details.component';
import {TransactionComponent} from '../components/transaction/transaction.component';
import {CanDeactivateGuard} from '../guards/canDeactivateForm.guard';

const routes: Routes = [
	{
		path: '',
		component: OrderComponent,
		title: 'orders',
		children: [
			{path: 'all', component: AllComponent, title: 'all orders'},
			{path: 'new', component: AddEditComponent, title: 'add new order', canDeactivate: [CanDeactivateGuard]},
			{path: 'edit', component: AddEditComponent, title: "edit order's data", canDeactivate: [CanDeactivateGuard]},
			{path: 'transaction', component: TransactionComponent, title: 'order transaction'},
			{path: 'details', component: DetailsComponent, title: 'order details'},
			{path: '', redirectTo: 'all', pathMatch: 'full'},
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class OrderRoutingModule {}
