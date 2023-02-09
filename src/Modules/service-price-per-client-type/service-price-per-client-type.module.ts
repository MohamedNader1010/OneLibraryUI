import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ServicePricePerClientTypeComponent} from './service-price-per-client-Type.component';
import {ServicePricePerClientTypeRoutingModule} from './service-price-per-client-type-routing.module';
import {AllComponent} from './Components/all/all.component';
import {SharedModule} from '../shared/shared.module';
import {LoginComponent} from '../authentication.Module/components/login/login.component';
import {AddEditComponent} from './Components/add-edit/add-edit.component';
import {MatComponentsModule} from '../mat-components.Module/mat-components.module';
import {ReactiveFormsModule} from '@angular/forms';

@NgModule({
	declarations: [ServicePricePerClientTypeComponent, AllComponent, AddEditComponent],
	imports: [ReactiveFormsModule, CommonModule, ServicePricePerClientTypeRoutingModule, SharedModule, MatComponentsModule],
	providers: [LoginComponent],
})
export class ServicePricePerClientTypeModule {}
