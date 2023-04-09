import {CommonModule} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginGuard} from '../authentication.Module/guards/login.guard';
import {MatComponentsModule} from '../mat-components.Module/mat-components.module';
import {SharedModule} from '../shared/shared.module';
import {ClientTypeComponent} from './clientType.component';
import {AddEditComponent} from './components/add-edit/add-edit.component';
import {AllComponent} from './components/all/all.component';
import {CanDeactivateGuard} from './guards/canDeactivateForm.guard';
import {ServiceTypesRoutingModule} from './routing/serviceType-routing.module';
import {ClientTypeService} from './services/clientType.service';
import { ClientTypeFormDialogComponent } from './components/client-type-form-dialog/client-type-form-dialog.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
	declarations: [ClientTypeComponent, AllComponent, AddEditComponent, ClientTypeFormDialogComponent],
	imports: [FormsModule, ReactiveFormsModule, CommonModule, ServiceTypesRoutingModule, MatComponentsModule, SharedModule, TranslateModule],
	providers: [LoginGuard, ClientTypeService, CanDeactivateGuard],
})
export class ClientTypeModule {}
