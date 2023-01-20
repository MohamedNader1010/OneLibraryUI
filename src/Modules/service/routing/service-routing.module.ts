import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ServiceComponent} from '../service.component';
import {AllComponent} from './../components/all/all.component';
import {AddEditComponent} from './../components/add-edit/add-edit.component';
import {CanDeactivateGuard} from '../guards/canDeactivateForm.guard';

const routes: Routes = [
	{
		path: '',
		component: ServiceComponent,
		title: 'الخدمات',
		children: [
			{path: 'all', component: AllComponent, title: 'جميع الخدمات'},
			{path: 'new', component: AddEditComponent, title: 'اضافة خدمة جديدة', canDeactivate: [CanDeactivateGuard]},
			{path: 'edit', component: AddEditComponent, title: 'تعديل الخدمة', canDeactivate: [CanDeactivateGuard]},
			{path: '', redirectTo: 'all', pathMatch: 'full'},
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ServiceRoutingModule {}
