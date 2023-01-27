import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AllComponent} from '../components/all/all.component';
import {AddEditComponent} from '../components/add-edit/add-edit.component';
import {CanDeactivateGuard} from '../guards/canDeactivateForm.guard';
import {LoginGuard} from 'src/Modules/authentication.Module/guards/login.guard';
import {StageComponent} from '../stage.component';

const routes: Routes = [
	{
		path: '',
		component: StageComponent,
		title: 'المراحل الدراسية',
		canActivateChild: [LoginGuard],
		children: [
			{path: 'all', component: AllComponent, title: 'جميع المراحل الدراسية'},
			{path: 'new', component: AddEditComponent, title: 'اضافة مرحلة دراسية جديدة', canDeactivate: [CanDeactivateGuard]},
			{path: 'edit', component: AddEditComponent, title: 'تعديل المرحلة الدراسية', canDeactivate: [CanDeactivateGuard]},
			{path: '', redirectTo: 'all', pathMatch: 'full'},
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class StageRoutingModule {}
