import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginGuard} from 'src/Modules/authentication.Module/guards/login.guard';
import {AllComponent} from '../components/all/all.component';
import {IncomesOutcomesComponent} from '../incomes-outcomes.component';

const routes: Routes = [
	{
		path: '',
		component: IncomesOutcomesComponent,
		title: 'الماليات',
		canActivateChild: [LoginGuard],
		children: [
			{path: 'all', component: AllComponent, title: 'الماليات'},
			{path: '', redirectTo: 'all', pathMatch: 'full'},
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class IncomesOutcomesRoutingModule {}
