import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {LoginGuard} from 'src/Modules/authentication.Module/guards/login.guard';
import {NotfoundComponent} from '../components/notfound/notfound.component';
import {SharedComponent} from '../shared.component';

const routes: Routes = [
	{
		path: '',
		component: SharedComponent,
		title: 'الرئيسية',
		children: [
			{path: 'services', loadChildren: () => import('../../service/service.module').then((m) => m.ServiceModule), canLoad: [LoginGuard]},
			{path: 'orders', loadChildren: () => import('../../order/order.module').then((m) => m.OrderModule), canLoad: [LoginGuard]},
			{path: 'materials', loadChildren: () => import('../../material/material.module').then((m) => m.MaterialModule), canLoad: [LoginGuard]},
			{path: 'serviceTypes', loadChildren: () => import('../../serviceType/serviceType.module').then((m) => m.ServiceTypeModule), canLoad: [LoginGuard]},
			{path: 'clients', loadChildren: () => import('../../client/client.module').then((m) => m.ClientModule), canLoad: [LoginGuard]},
			{path: 'clientTypes', loadChildren: () => import('../../clientType/clientType.module').then((m) => m.ClientTypeModule), canLoad: [LoginGuard]},
			{
				path: 'servicePrice',
				loadChildren: () => import('../../service-price-per-client-type/service-price-per-client-type.module').then((m) => m.ServicePricePerClientTypeModule),
				canLoad: [LoginGuard],
			},
			{path: 'notes', loadChildren: () => import('../../note/note.module').then((m) => m.NoteModule), canLoad: [LoginGuard]},
		],
	},
	{path: '**', component: NotfoundComponent, title: '404 - not found'},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class SharedRoutingModule {}
