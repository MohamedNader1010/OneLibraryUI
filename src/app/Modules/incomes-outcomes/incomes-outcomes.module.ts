import { NgModule } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { IncomesOutcomesComponent } from './incomes-outcomes.component';
import { FormDialogComponent } from './components/formDialog/form.dialog.component';
import { TranslateModule } from '@ngx-translate/core';
import { LoginGuard } from '../../core/authentication/guards/login.guard';
import { MatComponentsModule } from '../../shared/modules/mat-components.module';
import { SharedModule } from '../../shared/shared.module';
import { IncomesOutcomesRoutingModule } from './IncomesOutcomes-routing.module';

@NgModule({
  declarations: [IncomesOutcomesComponent, FormDialogComponent],
  imports: [TranslateModule, CommonModule, IncomesOutcomesRoutingModule, FormsModule, ReactiveFormsModule, CommonModule, SharedModule, MatComponentsModule],
  providers: [LoginGuard, DatePipe],
})
export class IncomesOutcomesModule {}
