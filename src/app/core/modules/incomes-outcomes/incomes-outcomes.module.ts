import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatComponentsModule } from '../../../shared/modules/mat-components.Module/mat-components.module';
import { SharedModule } from '../../../shared/shared.module';
import { LoginGuard } from '../../authentication/guards/login.guard';
import { CloseStartShiftFormDialogComponent } from './components/close-start-shift-form-dialog/close-start-shift-form-dialog.component';
import { FormDialogComponent } from './components/formDialog/form.dialog.component';
import { ShiftDetailsComponent } from './components/shift-details/shift-details.component';
import { ShiftsComponent } from './components/shifts/shifts.component';
import { IncomesOutcomesComponent } from './incomes-outcomes.component';
import { IncomesOutcomesRoutingModule } from './routing/IncomesOutcomes-routing.module';

@NgModule({
  declarations: [IncomesOutcomesComponent, FormDialogComponent, ShiftsComponent, CloseStartShiftFormDialogComponent, ShiftDetailsComponent],
  imports: [TranslateModule, CommonModule, IncomesOutcomesRoutingModule, FormsModule, ReactiveFormsModule, CommonModule, SharedModule, MatComponentsModule],
  providers: [LoginGuard, DatePipe],
})
export class IncomesOutcomesModule {}
