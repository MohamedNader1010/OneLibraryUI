import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MatComponentsModule } from '../../../shared/modules/mat-components.Module/mat-components.module';
import { SharedModule } from '../../../shared/shared.module';
import { EmployeeService } from '../../data/project-management/repositories/employee.service';
import { EmployeeFormDialogComponent } from './components/employee-form-dialog/employee-form-dialog.component';
import { EmployeeComponent } from './employee.component';
import { EmployeeRoutingModule } from './routing/employee-routing.module';

@NgModule({
  declarations: [EmployeeComponent, EmployeeFormDialogComponent],
  imports: [FormsModule, ReactiveFormsModule, CommonModule, EmployeeRoutingModule, MatComponentsModule, SharedModule, TranslateModule],
  providers: [EmployeeService],
})
export class EmployeeModule {}
