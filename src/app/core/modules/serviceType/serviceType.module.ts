import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatComponentsModule } from '../../../shared/modules/mat-components.Module/mat-components.module';
import { SharedModule } from '../../../shared/shared.module';
import { LoginGuard } from '../../authentication/guards/login.guard';
import { ServicesTypeService } from '../../data/project-management/repositories/serviceType.service';
import { ServiceTypeFormDialogComponent } from './components/service-type-form-dialog/service-type-form-dialog.component';
import { ServiceTypesRoutingModule } from './routing/serviceType-routing.module';
import { ServiceTypeComponent } from './serviceType.component';

@NgModule({
  declarations: [ServiceTypeComponent, ServiceTypeFormDialogComponent],
  imports: [FormsModule, ReactiveFormsModule, CommonModule, ServiceTypesRoutingModule, MatComponentsModule, SharedModule, TranslateModule],
  providers: [LoginGuard, ServicesTypeService],
})
export class ServiceTypeModule {}
