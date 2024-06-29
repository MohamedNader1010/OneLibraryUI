import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { AttendanceRoutingModule } from './routing/attendance-routing.module';
import { AttendanceComponent } from './attendance.component';
import { AttendanceFormDialogComponent } from './components/attendance-form-dialog/attendance-form-dialog.component';
import { LoginGuard } from '../authentication.Module/guards/login.guard';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatComponentsModule } from '../mat-components.Module/mat-components.module';
import { SharedModule } from '../shared/shared.module';
import { TranslateModule } from '@ngx-translate/core';
import { OwlDateTimeModule, OwlNativeDateTimeModule } from '@danielmoncada/angular-datetime-picker';

@NgModule({
  declarations: [AttendanceComponent, AttendanceFormDialogComponent],
  imports: [TranslateModule, CommonModule, AttendanceRoutingModule, FormsModule, ReactiveFormsModule, CommonModule, SharedModule, MatComponentsModule, OwlDateTimeModule, OwlNativeDateTimeModule],
  providers: [LoginGuard, DatePipe],
})
export class AttendanceModule {}
