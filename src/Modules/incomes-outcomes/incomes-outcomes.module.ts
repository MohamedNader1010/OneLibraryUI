import {NgModule} from '@angular/core';
import {CommonModule, DatePipe} from '@angular/common';
import {IncomesOutcomesRoutingModule} from './routing/IncomesOutcomes-routing.module';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {LoginGuard} from '../authentication.Module/guards/login.guard';
import {MatComponentsModule} from '../mat-components.Module/mat-components.module';
import {IncomesOutcomesComponent} from './incomes-outcomes.component';
import {SharedModule} from '../shared/shared.module';
import {FormDialogComponent} from './components/formDialog/form.dialog.component';
import { CloseStartShiftFormDialogComponent } from "./components/close-start-shift-form-dialog/close-start-shift-form-dialog.component"
import { ShiftsComponent } from "./components/shifts/shifts.component"

@NgModule({
	declarations: [IncomesOutcomesComponent, FormDialogComponent, ShiftsComponent, CloseStartShiftFormDialogComponent],
	imports: [CommonModule, IncomesOutcomesRoutingModule, FormsModule, ReactiveFormsModule, CommonModule, SharedModule, MatComponentsModule],
	providers: [LoginGuard, DatePipe],
})
export class IncomesOutcomesModule {}
