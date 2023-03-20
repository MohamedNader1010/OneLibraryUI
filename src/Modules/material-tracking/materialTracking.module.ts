import {CommonModule, DatePipe} from '@angular/common';
import {NgModule} from '@angular/core';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginGuard} from '../authentication.Module/guards/login.guard';
import {MatComponentsModule} from '../mat-components.Module/mat-components.module';
import {SharedModule} from '../shared/shared.module';
import {AllComponent} from './components/all/all.component';
import {DeleteDialogComponent} from './components/delete/delete.dialog.component';
import {FormDialogComponent} from './components/formDialog/form.dialog.component';
import {materialTrackingComponent} from './materialTracking.component';
import {MaterialTrackingRoutingModule} from './routing/materialTracking-routing.module';

@NgModule({
	declarations: [AllComponent, materialTrackingComponent, DeleteDialogComponent, FormDialogComponent],
	imports: [CommonModule, MaterialTrackingRoutingModule, FormsModule, ReactiveFormsModule, CommonModule, SharedModule, MatComponentsModule],
	providers: [LoginGuard, DatePipe],
})
export class materialTrackingModule {}
