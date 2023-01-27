import {NgModule} from '@angular/core';
import {Routes, RouterModule} from '@angular/router';
import {AddEditComponent} from '../components/add-edit/add-edit.component';
import {AllComponent} from '../components/all/all.component';
import {EmployeeComponent} from '../employee.component';
import {CanDeactivateGuard} from '../guards/canDeactivateForm.guard';

const routes: Routes = [
	{
		path: '',
		component: EmployeeComponent,
		title: 'الموظفون',
		children: [
			{path: 'all', component: AllComponent, title: 'جميع الموظفون'},
			{path: 'new', component: AddEditComponent, title: 'اضافة موظف جديد', canDeactivate: [CanDeactivateGuard]},
			{path: 'edit', component: AddEditComponent, title: 'تعديل الموظف', canDeactivate: [CanDeactivateGuard]},
			{path: '', redirectTo: 'all', pathMatch: 'full'},
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class EmployeeRoutingModule {}
