import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginGuard} from 'src/Modules/authentication.Module/guards/login.guard';
import {AllComponent} from '../components/all/all.component';
import {materialTrackingComponent} from '../materialTracking.component';

const routes: Routes = [
	{
		path: '',
		component: materialTrackingComponent,
		title: 'أستهلاك الخامات',
		canActivateChild: [LoginGuard],
		children: [
			{path: 'all', component: AllComponent, title: 'أستهلاك الخامات'},
			{path: '', redirectTo: 'all', pathMatch: 'full'},
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class MaterialTrackingRoutingModule {}
