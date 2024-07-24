import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { ServiceFormDialogComponent } from './components/service-form-dialog/service-form-dialog.component';
import { LoginGuard } from '../../core/authentication/guards/login.guard';
import { ServicesService } from '../../core/data/services/services.service';
import { MatComponentsModule } from '../../shared/modules/mat-components.module';
import { SharedModule } from '../../shared/shared.module';
import { ServiceRoutingModule } from './service-routing.module';
import { ServiceComponent } from './service.component';

@NgModule({
  declarations: [ServiceComponent, ServiceFormDialogComponent],
  imports: [FormsModule, ReactiveFormsModule, CommonModule, ServiceRoutingModule, MatComponentsModule, SharedModule, TranslateModule],
  providers: [LoginGuard, ServicesService],
})
export class ServiceModule {}
