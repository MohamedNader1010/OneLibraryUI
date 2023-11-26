import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MatComponentsModule } from '../../../shared/modules/mat-components.Module/mat-components.module';
import { SharedModule } from '../../../shared/shared.module';
import { LoginGuard } from '../../authentication/guards/login.guard';
import { AttendanceComponent } from './attendance.component';
import { AttendanceFormDialogComponent } from './components/attendance-form-dialog/attendance-form-dialog.component';
import { AttendanceRoutingModule } from './routing/attendance-routing.module';

@NgModule({
  declarations: [AttendanceComponent, AttendanceFormDialogComponent],
  imports: [TranslateModule, CommonModule, AttendanceRoutingModule, FormsModule, ReactiveFormsModule, CommonModule, SharedModule, MatComponentsModule],
  providers: [LoginGuard, DatePipe],
})
export class AttendanceModule {}
