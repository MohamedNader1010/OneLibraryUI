import { CommonModule, DatePipe } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatComponentsModule } from '../../../shared/modules/mat-components.Module/mat-components.module';
import { SharedModule } from '../../../shared/shared.module';
import { LoginGuard } from '../../authentication/guards/login.guard';
import { FormDialogComponent } from './components/formDialog/form.dialog.component';
import { materialTrackingComponent } from './materialTracking.component';
import { MaterialTrackingRoutingModule } from './routing/materialTracking-routing.module';

@NgModule({
  declarations: [materialTrackingComponent, FormDialogComponent],
  imports: [CommonModule, MaterialTrackingRoutingModule, FormsModule, ReactiveFormsModule, CommonModule, SharedModule, MatComponentsModule],
  providers: [LoginGuard, DatePipe],
})
export class materialTrackingModule {}
