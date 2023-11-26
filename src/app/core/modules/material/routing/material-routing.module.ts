import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {MaterialComponent} from '../material.component';
import { LoginGuard } from 'src/app/core/authentication/guards/login.guard';

const routes: Routes = [
	{
		path: '',
		component: MaterialComponent,
		title: 'الخامات',
		canActivateChild: [LoginGuard],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class MaterialsRoutingModule {}
