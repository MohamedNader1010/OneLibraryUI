import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NoteComponent} from '../note.component';
import {AllComponent} from '../components/all/all.component';
import {AddEditComponent} from '../components/add-edit/add-edit.component';
import {DetailsComponent} from '../components/single/details.component';
import {CanDeactivateGuard} from '../guards/canDeactivateForm.guard';
import {LoginGuard} from 'src/Modules/authentication.Module/guards/login.guard';

const routes: Routes = [
	{
		path: '',
		component: NoteComponent,
		title: 'المذكرات',
		canActivateChild: [LoginGuard],
		children: [
			{path: 'all', component: AllComponent, title: 'جميع المذكرات'},
			{path: 'allByTeacherId', component: AllComponent, title: 'جميع المذكرات للمدرس'},
			{path: 'new', component: AddEditComponent, title: 'أضافة مذكرة جديدة', canDeactivate: [CanDeactivateGuard]},
			{path: 'edit', component: AddEditComponent, title: 'تعديل المذكرة', canDeactivate: [CanDeactivateGuard]},
			{path: 'details', component: DetailsComponent, title: 'تفاصيل المذكرة'},
			{path: '', redirectTo: 'all', pathMatch: 'full'},
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class NoteRoutingModule {}
