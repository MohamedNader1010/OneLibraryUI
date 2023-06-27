import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ServicePricePerClientTypeComponent} from './service-price-per-client-Type.component';
import {ServicePricePerClientTypeRoutingModule} from './routing/service-price-per-client-type-routing.module';
import {SharedModule} from '../shared/shared.module';
import {LoginComponent} from '../authentication.Module/components/login/login.component';
import {MatComponentsModule} from '../mat-components.Module/mat-components.module';
import {ReactiveFormsModule} from '@angular/forms';
import {TranslateModule} from '@ngx-translate/core';
import {ServiceTypePerClientFormDialogComponent} from './Components/service-type-per-client-form-dialog/service-type-per-client-form-dialog.component';

@NgModule({
	declarations: [ServicePricePerClientTypeComponent, ServiceTypePerClientFormDialogComponent],
	imports: [ReactiveFormsModule, CommonModule, ServicePricePerClientTypeRoutingModule, SharedModule, MatComponentsModule, TranslateModule],
	providers: [LoginComponent],
})
export class ServicePricePerClientTypeModule {}
