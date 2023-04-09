import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {IncomesOutcomesRoutingModule} from './routing/IncomesOutcomes-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginGuard} from '../authentication.Module/guards/login.guard';
import {MatComponentsModule} from '../mat-components.Module/mat-components.module';
import {IncomesOutcomesComponent} from './incomes-outcomes.component';
import {SharedModule} from '../shared/shared.module';
import {AllComponent} from './components/all/all.component';
import {DeleteDialogComponent} from './components/delete/delete.dialog.component';
import {FormDialogComponent} from './components/formDialog/form.dialog.component';

@NgModule({
	declarations: [AllComponent, IncomesOutcomesComponent, DeleteDialogComponent, FormDialogComponent],
	imports: [CommonModule, IncomesOutcomesRoutingModule, FormsModule, ReactiveFormsModule, CommonModule, SharedModule, MatComponentsModule],
	providers: [LoginGuard, DatePipe],
})
export class IncomesOutcomesModule {}
