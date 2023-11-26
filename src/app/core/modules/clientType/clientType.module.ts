import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MatComponentsModule } from '../../../shared/modules/mat-components.Module/mat-components.module';
import { SharedModule } from '../../../shared/shared.module';
import { LoginGuard } from '../../authentication/guards/login.guard';
import { ClientTypeService } from '../../data/project-management/repositories/clientType.service';
import { ClientTypeComponent } from './clientType.component';
import { ClientTypeFormDialogComponent } from './components/client-type-form-dialog/client-type-form-dialog.component';
import { ServiceTypesRoutingModule } from './routing/serviceType-routing.module';

@NgModule({
  declarations: [ClientTypeComponent, ClientTypeFormDialogComponent],
  imports: [FormsModule, ReactiveFormsModule, CommonModule, ServiceTypesRoutingModule, MatComponentsModule, SharedModule, TranslateModule],
  providers: [LoginGuard, ClientTypeService],
})
export class ClientTypeModule {}
