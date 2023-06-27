import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatComponentsModule } from '../mat-components.Module/mat-components.module';
import { SharedModule } from '../shared/shared.module';
import { EmployeeComponent } from './employee.component';
import { EmployeeRoutingModule } from './routing/employee-routing.module';
import { EmployeeFormDialogComponent } from './components/employee-form-dialog/employee-form-dialog.component';
import { TranslateModule } from '@ngx-translate/core';
import { EmployeeService } from './services/employee.service';

@NgModule({
	declarations: [EmployeeComponent, EmployeeFormDialogComponent],
	imports: [
		FormsModule,
		ReactiveFormsModule,
		CommonModule,
		EmployeeRoutingModule,
		MatComponentsModule,
		SharedModule,
		TranslateModule
	],
	providers: [EmployeeService],
})
export class EmployeeModule { }
