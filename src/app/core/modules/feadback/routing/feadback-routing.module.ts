import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import { LoginGuard } from 'src/app/core/authentication/guards/login.guard';
import {FeadbackComponent} from '../feadback.component';

const routes: Routes = [
	{
		path: '',
		component: FeadbackComponent,
		title: 'تعليقات العملاء',
		canActivateChild: [LoginGuard],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class FeadbackRoutingModule {}
