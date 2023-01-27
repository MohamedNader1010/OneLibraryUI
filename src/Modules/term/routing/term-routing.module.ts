import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AllComponent} from '../components/all/all.component';
import {AddEditComponent} from '../components/add-edit/add-edit.component';
import {CanDeactivateGuard} from '../guards/canDeactivateForm.guard';
import {LoginGuard} from 'src/Modules/authentication.Module/guards/login.guard';
import {TermComponent} from '../term.component';

const routes: Routes = [
	{
		path: '',
		component: TermComponent,
		title: 'الفصول الدراسية',
		canActivateChild: [LoginGuard],
		children: [
			{path: 'all', component: AllComponent, title: 'جميع الفصول الدراسية'},
			{path: 'new', component: AddEditComponent, title: 'اضافة فصل دراسي جديد', canDeactivate: [CanDeactivateGuard]},
			{path: 'edit', component: AddEditComponent, title: 'تعديل الفصل الدراسي', canDeactivate: [CanDeactivateGuard]},
			{path: '', redirectTo: 'all', pathMatch: 'full'},
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class TermRoutingModule {}
