import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginGuard} from 'src/Modules/authentication.Module/guards/login.guard';
import {AllComponent} from '../components/all/all.component';
import {FeadbackComponent} from '../feadback.component';

const routes: Routes = [
	{
		path: '',
		component: FeadbackComponent,
		title: 'تعليقات العملاء',
		canActivateChild: [LoginGuard],
		children: [
			{path: 'all', component: AllComponent, title: 'جميع التعليقات'},
			{path: '', redirectTo: 'all', pathMatch: 'full'},
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class FeadbackRoutingModule {}
