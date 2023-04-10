import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {ServiceRoutingModule} from './routing/service-routing.module';
import {ServiceComponent} from './service.component';
import {AllComponent} from './components/all/all.component';
import {AddEditComponent} from './components/add-edit/add-edit.component';
import {MatComponentsModule} from './../mat-components.Module/mat-components.module';
import {ServicesService} from './services/services.service';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';
import {CanDeactivateGuard} from './guards/canDeactivateForm.guard';
import {LoginGuard} from '../authentication.Module/guards/login.guard';
import { TranslateModule } from '@ngx-translate/core';
import { ServiceFormDialogComponent } from './components/service-form-dialog/service-form-dialog.component';

@NgModule({
	declarations: [ServiceComponent, AllComponent, AddEditComponent, ServiceFormDialogComponent],
	imports: [FormsModule, ReactiveFormsModule, CommonModule, ServiceRoutingModule, MatComponentsModule, SharedModule,TranslateModule],
	providers: [LoginGuard, ServicesService, CanDeactivateGuard],
})
export class ServiceModule {}
