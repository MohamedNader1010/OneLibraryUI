import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {ClientTypeComponent} from '../clientType.component';
import {LoginGuard} from 'src/Modules/authentication.Module/guards/login.guard';

const routes: Routes = [
	{
		path: '',
		component: ClientTypeComponent,
		title: 'انواع العملاء',
		canActivate: [LoginGuard],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ServiceTypesRoutingModule {}
