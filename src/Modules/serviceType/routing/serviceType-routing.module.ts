import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AllComponent} from '../components/all/all.component';
import {AddEditComponent} from '../components/add-edit/add-edit.component';
import {ServiceTypeComponent} from '../serviceType.component';
import {CanDeactivateGuard} from '../guards/canDeactivateForm.guard';

const routes: Routes = [
	{
		path: '',
		component: ServiceTypeComponent,
		title: 'service Types',
		children: [
			{path: 'all', component: AllComponent, title: 'all service Types'},
			{path: 'new', component: AddEditComponent, title: 'add new service Type', canDeactivate: [CanDeactivateGuard]},
			{path: 'edit', component: AddEditComponent, title: 'edit service Type data', canDeactivate: [CanDeactivateGuard]},
			{path: '', redirectTo: 'all', pathMatch: 'full'},
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ServiceTypesRoutingModule {}
