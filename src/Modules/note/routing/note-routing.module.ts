import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {NoteComponent} from '../note.component';
import {LoginGuard} from 'src/Modules/authentication.Module/guards/login.guard';

const routes: Routes = [
	{
		path: '',
		component: NoteComponent,
		title: 'المذكرات',
		canActivateChild: [LoginGuard],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class NoteRoutingModule {}
