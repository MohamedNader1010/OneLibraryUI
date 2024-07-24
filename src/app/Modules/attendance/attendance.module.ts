import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { AttendanceComponent } from './attendance.component';
import { AttendanceFormDialogComponent } from './components/attendance-form-dialog/attendance-form-dialog.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from '@danielmoncada/angular-datetime-picker';
import { LoginGuard } from '../../core/authentication/guards/login.guard';
import { MatComponentsModule } from '../../shared/modules/mat-components.module';
import { SharedModule } from '../../shared/shared.module';
import { AttendanceRoutingModule } from './attendance-routing.module';

@NgModule({
  declarations: [AttendanceComponent, AttendanceFormDialogComponent],
  imports: [TranslateModule, CommonModule, AttendanceRoutingModule, FormsModule, ReactiveFormsModule, CommonModule, SharedModule, MatComponentsModule, OwlDateTimeModule, OwlNativeDateTimeModule],
  providers: [LoginGuard, DatePipe],
})
export class AttendanceModule {}
