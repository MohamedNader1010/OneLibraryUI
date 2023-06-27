import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginGuard} from 'src/Modules/authentication.Module/guards/login.guard';
import {materialTrackingComponent} from '../materialTracking.component';

const routes: Routes = [
	{
		path: '',
		component: materialTrackingComponent,
		title: 'أستهلاك الخامات',
		canActivateChild: [LoginGuard],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class MaterialTrackingRoutingModule {}
