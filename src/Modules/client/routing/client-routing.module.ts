import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {ClientComponent} from '../client.component';
import {AddEditComponent} from '../components/add-edit/add-edit.component';
import {AllComponent} from '../components/all/all.component';
import {SingleComponent} from '../components/single/single.component';
import {CanDeactivateGuard} from '../guards/canDeactivateForm.guard';

const routes: Routes = [
	{
		path: '',
		component: ClientComponent,
		title: 'العملاء',
		children: [
			{path: 'all', component: AllComponent, title: 'جميع العملاء'},
			{path: 'new', component: AddEditComponent, title: 'عميل جديد', canDeactivate: [CanDeactivateGuard]},
			{path: 'edit', component: AddEditComponent, title: 'تعديل العميل', canDeactivate: [CanDeactivateGuard]},
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
