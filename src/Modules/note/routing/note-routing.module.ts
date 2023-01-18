import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NoteComponent} from '../note.component';
import {AllComponent} from '../components/all/all.component';
import {AddEditComponent} from '../components/add-edit/add-edit.component';
import {DetailsComponent} from '../components/single/details.component';

const routes: Routes = [
	{
		path: '',
		component: NoteComponent,
		title: 'notes',
		children: [
			{path: 'all', component: AllComponent, title: 'all notes'},
			{path: 'allByTeacherId', component: AllComponent, title: 'all notes by teacher'},
			{path: 'new', component: AddEditComponent, title: 'add new note'},
			{path: 'edit', component: AddEditComponent, title: "edit note's data"},
			{path: 'details', component: DetailsComponent, title: 'note details'},
			{path: '', redirectTo: 'all', pathMatch: 'full'},
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class NoteRoutingModule {}
