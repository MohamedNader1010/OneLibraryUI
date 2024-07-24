import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { ServicePricePerClientTypeComponent } from './service-price-per-client-Type.component';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ServiceTypePerClientFormDialogComponent } from './Components/service-type-per-client-form-dialog/service-type-per-client-form-dialog.component';
import { LoginComponent } from '../../core/authentication/components/login/login.component';
import { MatComponentsModule } from '../../shared/modules/mat-components.module';
import { SharedModule } from '../../shared/shared.module';
import { ServicePricePerClientTypeRoutingModule } from './service-price-per-client-type-routing.module';

@NgModule({
  declarations: [ServicePricePerClientTypeComponent, ServiceTypePerClientFormDialogComponent],
  imports: [ReactiveFormsModule, CommonModule, ServicePricePerClientTypeRoutingModule, SharedModule, MatComponentsModule, TranslateModule],
  providers: [LoginComponent],
})
export class ServicePricePerClientTypeModule {}
