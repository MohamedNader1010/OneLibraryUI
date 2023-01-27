import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatComponentsModule} from '../mat-components.Module/mat-components.module';
import {ServicesTypeService} from '../serviceType/services/serviceType.service';
import {SharedModule} from '../shared/shared.module';
import {AddEditComponent} from './components/add-edit/add-edit.component';
import {AllComponent} from './components/all/all.component';
import {EmployeeComponent} from './employee.component';
import {CanDeactivateGuard} from './guards/canDeactivateForm.guard';
import {EmployeeRoutingModule} from './routing/employee-routing.module';

@NgModule({
	declarations: [EmployeeComponent, AllComponent, AddEditComponent],
	imports: [FormsModule, ReactiveFormsModule, CommonModule, EmployeeRoutingModule, MatComponentsModule, SharedModule],
	providers: [ServicesTypeService, CanDeactivateGuard],
})
export class EmployeeModule {}
