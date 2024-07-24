import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { ShiftsComponent } from './shifts.component';
import { ShiftDetailsComponent } from './components/shift-details/shift-details.component';
import { CloseStartShiftFormDialogComponent } from './components/close-start-shift-form-dialog/close-start-shift-form-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { LoginGuard } from '../../core/authentication/guards/login.guard';
import { MatComponentsModule } from '../../shared/modules/mat-components.module';
import { SharedModule } from '../../shared/shared.module';
import { ShiftsRoutingModule } from './shifts-routing.module';
import { ShiftsListComponent } from './components/shifts-list/shifts-list.component';

@NgModule({
  declarations: [ShiftsComponent, ShiftsListComponent, CloseStartShiftFormDialogComponent, ShiftDetailsComponent],
  imports: [TranslateModule, CommonModule, ShiftsRoutingModule, FormsModule, ReactiveFormsModule, CommonModule, SharedModule, MatComponentsModule],
  providers: [LoginGuard, DatePipe],
})
export class ShiftsModule {}
