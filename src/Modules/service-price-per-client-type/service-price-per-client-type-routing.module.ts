import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';

import {AllComponent} from './Components/all/all.component';
import {AddEditComponent} from './Components/add-edit/add-edit.component';
import {ServicePricePerClientTypeComponent} from './service-price-per-client-Type.component';

const routes: Routes = [
	{
		path: '',
		component: ServicePricePerClientTypeComponent,
		title: 'سعر الخدمة لكل فئة',
		children: [
			{path: 'all', component: AllComponent, title: 'جميع أسعار الخدمات'},
			{path: 'new', component: AddEditComponent, title: 'أضافة سعر جديد للخدمة'},
			{path: 'edit', component: AddEditComponent, title: 'تعديل سعر الخدمة'},
			{path: '', redirectTo: 'all', pathMatch: 'full'},
		],
	},
];

@NgModule({
	imports: [RouterModule.forChild(routes)],
	exports: [RouterModule],
})
export class ServicePricePerClientTypeRoutingModule {}
