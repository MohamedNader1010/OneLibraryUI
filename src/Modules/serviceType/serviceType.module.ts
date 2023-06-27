import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {ServiceTypeComponent} from './serviceType.component';
import {ServiceTypesRoutingModule} from './routing/serviceType-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {MatComponentsModule} from '../mat-components.Module/mat-components.module';
import {SharedModule} from '../shared/shared.module';
import {ServicesTypeService} from './services/serviceType.service';
import {LoginGuard} from '../authentication.Module/guards/login.guard';
import {ServiceTypeFormDialogComponent} from './components/service-type-form-dialog/service-type-form-dialog.component';
import {TranslateModule} from '@ngx-translate/core';

@NgModule({
	declarations: [ServiceTypeComponent, ServiceTypeFormDialogComponent],
	imports: [FormsModule, ReactiveFormsModule, CommonModule, ServiceTypesRoutingModule, MatComponentsModule, SharedModule, TranslateModule],
	providers: [LoginGuard, ServicesTypeService],
})
export class ServiceTypeModule {}
