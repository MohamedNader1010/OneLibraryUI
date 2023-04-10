import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {MatComponentsModule} from '../mat-components.Module/mat-components.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {SharedModule} from '../shared/shared.module';
import {MaterialComponent} from './material.component';
import {MaterialService} from './services/material.service';
import {MaterialsRoutingModule} from './routing/material-routing.module';
import {LoginGuard} from '../authentication.Module/guards/login.guard';
import {MaterialFormDialogComponent} from './components/material-form-dialog/material-form-dialog.component';
import {TranslateModule} from '@ngx-translate/core';
import {DeleteDialogComponent} from './components/delete/delete.dialog.component';

@NgModule({
	declarations: [MaterialComponent, MaterialFormDialogComponent, DeleteDialogComponent],
	imports: [FormsModule, ReactiveFormsModule, CommonModule, MaterialsRoutingModule, MatComponentsModule, SharedModule, TranslateModule],
	providers: [LoginGuard, MaterialService],
})
export class MaterialModule {}
