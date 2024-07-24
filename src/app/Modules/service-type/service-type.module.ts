import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ServiceTypeFormDialogComponent } from './components/service-type-form-dialog/service-type-form-dialog.component';
import { TranslateModule } from '@ngx-translate/core';
import { LoginGuard } from '../../core/authentication/guards/login.guard';
import { ServicesTypeService } from '../../core/data/services/service-type.service';
import { MatComponentsModule } from '../../shared/modules/mat-components.module';
import { SharedModule } from '../../shared/shared.module';
import { ServiceTypesRoutingModule } from './service-type-routing.module';
import { ServiceTypeComponent } from './service-type.component';

@NgModule({
  declarations: [ServiceTypeComponent, ServiceTypeFormDialogComponent],
  imports: [FormsModule, ReactiveFormsModule, CommonModule, ServiceTypesRoutingModule, MatComponentsModule, SharedModule, TranslateModule],
  providers: [LoginGuard, ServicesTypeService],
})
export class ServiceTypeModule {}
