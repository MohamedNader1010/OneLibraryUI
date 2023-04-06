import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MatComponentsModule} from '../mat-components.Module/mat-components.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';
import {MaterialComponent} from './material.component';
import {MaterialService} from './services/material.service';
import {MaterialsRoutingModule} from './routing/material-routing.module';
import {AllComponent} from './components/all/all.component';
import {AddEditComponent} from './components/add-edit/add-edit.component';
import {CanDeactivateGuard} from './guards/canDeactivateForm.guard';
import {LoginGuard} from '../authentication.Module/guards/login.guard';
import { MaterialFormDialogComponent } from './components/material-form-dialog/material-form-dialog.component';
import { TranslateModule } from '@ngx-translate/core';

@NgModule({
	declarations: [MaterialComponent, AllComponent, AddEditComponent, MaterialFormDialogComponent],
	imports: [FormsModule, ReactiveFormsModule, CommonModule, MaterialsRoutingModule, MatComponentsModule, SharedModule, TranslateModule],
	providers: [LoginGuard, MaterialService, CanDeactivateGuard],
})
export class MaterialModule {}
