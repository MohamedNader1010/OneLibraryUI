import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {OrderComponent} from '../order.component';
import {AllComponent} from '../components/all/all.component';
import {AddEditComponent} from '../components/add-edit/add-edit.component';
import {DetailsComponent} from '../components/details/details.component';
import {TransactionComponent} from '../components/transaction/transaction.component';
import {CanDeactivateGuard} from '../guards/canDeactivateForm.guard';
import {LoginGuard} from 'src/Modules/authentication.Module/guards/login.guard';

const routes: Routes = [
	{
		path: '',
		component: OrderComponent,
		title: 'الطلبات',
		canActivateChild: [LoginGuard],
		children: [
			{path: 'all', component: AllComponent, title: 'جميع الطلبات'},
			{path: 'new', component: AddEditComponent, title: 'طلب جديد', canDeactivate: [CanDeactivateGuard]},
			{path: 'edit', component: AddEditComponent, title: 'تعديل الطلب', canDeactivate: [CanDeactivateGuard]},
			{path: 'transaction', component: TransactionComponent, title: 'تعاملات مالية علي الطلب'},
			{path: 'details', component: DetailsComponent, title: 'تفاصيل الطلب'},
			{path: '', redirectTo: 'all', pathMatch: 'full'},
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class OrderRoutingModule {}
