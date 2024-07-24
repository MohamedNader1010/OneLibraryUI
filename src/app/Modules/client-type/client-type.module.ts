import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { LoginGuard } from '../../core/authentication/guards/login.guard';
import { ClientTypeService } from '../../core/data/services/client-type.service';
import { MatComponentsModule } from '../../shared/modules/mat-components.module';
import { SharedModule } from '../../shared/shared.module';
import { ServiceTypesRoutingModule } from '../service-type/service-type-routing.module';
import { ClientTypeFormDialogComponent } from './components/client-type-form-dialog/client-type-form-dialog.component';
import { ClientTypeComponent } from './client-type.component';
import { clientTypesRoutingModule } from './client-type-routing.module';

@NgModule({
  declarations: [ClientTypeComponent, ClientTypeFormDialogComponent],
  imports: [FormsModule, ReactiveFormsModule, CommonModule, clientTypesRoutingModule, MatComponentsModule, SharedModule, TranslateModule],
  providers: [LoginGuard, ClientTypeService],
})
export class ClientTypeModule {}
