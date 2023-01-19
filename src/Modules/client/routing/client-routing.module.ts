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
		title: 'clients',
		children: [
			{path: 'all', component: AllComponent, title: 'all clients'},
			{path: 'new', component: AddEditComponent, title: 'add new client', canDeactivate: [CanDeactivateGuard]},
			{path: 'edit', component: AddEditComponent, title: 'edit client data', canDeactivate: [CanDeactivateGuard]},
			{path: 'single', component: SingleComponent, title: 'client data'},
			{path: '', redirectTo: 'all', pathMatch: 'full'},
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ClientRoutingModule {}
