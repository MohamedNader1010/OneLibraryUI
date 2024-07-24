import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EmployeeComponent } from './employee.component';
import { EmployeeRoutingModule } from './employee-routing.module';
import { EmployeeFormDialogComponent } from './components/employee-form-dialog/employee-form-dialog.component';
import { TranslateModule } from '@ngx-translate/core';
import { EmployeeService } from '../../core/data/services/employee.service';
import { MatComponentsModule } from '../../shared/modules/mat-components.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [EmployeeComponent, EmployeeFormDialogComponent],
  imports: [FormsModule, ReactiveFormsModule, CommonModule, EmployeeRoutingModule, MatComponentsModule, SharedModule, TranslateModule],
  providers: [EmployeeService],
})
export class EmployeeModule {}
