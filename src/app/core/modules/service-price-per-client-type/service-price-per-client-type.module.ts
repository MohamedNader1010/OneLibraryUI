import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MatComponentsModule } from '../../../shared/modules/mat-components.Module/mat-components.module';
import { SharedModule } from '../../../shared/shared.module';
import { LoginComponent } from '../../authentication/components/login/login.component';
import { ServiceTypePerClientFormDialogComponent } from './Components/service-type-per-client-form-dialog/service-type-per-client-form-dialog.component';
import { ServicePricePerClientTypeRoutingModule } from './routing/service-price-per-client-type-routing.module';
import { ServicePricePerClientTypeComponent } from './service-price-per-client-Type.component';

@NgModule({
  declarations: [ServicePricePerClientTypeComponent, ServiceTypePerClientFormDialogComponent],
  imports: [ReactiveFormsModule, CommonModule, ServicePricePerClientTypeRoutingModule, SharedModule, MatComponentsModule, TranslateModule],
  providers: [LoginComponent],
})
export class ServicePricePerClientTypeModule {}
