import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MaterialComponent} from '../material.component';
import {AllComponent} from '../components/all/all.component';
import {AddEditComponent} from '../components/add-edit/add-edit.component';
import {CanDeactivateGuard} from '../guards/canDeactivateForm.guard';

const routes: Routes = [
	{
		path: '',
		component: MaterialComponent,
		title: 'الخامات',
		children: [
			{path: 'all', component: AllComponent, title: 'جميع الخامات'},
			{path: 'new', component: AddEditComponent, title: 'اضافة خامة جديدة', canDeactivate: [CanDeactivateGuard]},
			{path: 'edit', component: AddEditComponent, title: 'تعديل الخامات', canDeactivate: [CanDeactivateGuard]},
			{path: '', redirectTo: 'all', pathMatch: 'full'},
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class MaterialsRoutingModule {}
