import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ServiceTypeComponent} from './serviceType.component';
import {ServiceTypesRoutingModule} from './routing/serviceType-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatComponentsModule} from '../mat-components.Module/mat-components.module';
import {SharedModule} from '../shared/shared.module';
import {AddEditComponent} from './components/add-edit/add-edit.component';
import {AllComponent} from './components/all/all.component';
import {ServicesTypeService} from './services/serviceType.service';
import {CanDeactivateGuard} from './guards/canDeactivateForm.guard';
import {LoginGuard} from '../authentication.Module/guards/login.guard';

@NgModule({
	declarations: [ServiceTypeComponent, AllComponent, AddEditComponent],
	imports: [FormsModule, ReactiveFormsModule, CommonModule, ServiceTypesRoutingModule, MatComponentsModule, SharedModule],
	providers: [LoginGuard, ServicesTypeService, CanDeactivateGuard],
})
export class ServiceTypeModule {}
