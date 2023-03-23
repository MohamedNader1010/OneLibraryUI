import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';

import {FeadbackRoutingModule} from './routing/feadback-routing.module';
import {AllComponent} from './components/all/all.component';
import {DeleteDialogComponent} from './components/delete/delete.dialog.component';
import {FeadbackComponent} from './feadback.component';
import {FormDialogComponent} from './components/formDialog/form.dialog.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginGuard} from '../authentication.Module/guards/login.guard';
import {MatComponentsModule} from '../mat-components.Module/mat-components.module';
import {SharedModule} from '../shared/shared.module';

@NgModule({
	declarations: [AllComponent, FeadbackComponent, DeleteDialogComponent, FormDialogComponent],
	imports: [CommonModule, FeadbackRoutingModule, FormsModule, ReactiveFormsModule, CommonModule, SharedModule, MatComponentsModule],
	providers: [LoginGuard],
})
export class FeadbackModule {}
