import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { MatComponentsModule } from '../../../shared/modules/mat-components.Module/mat-components.module';
import { SharedModule } from '../../../shared/shared.module';
import { BankService } from '../../data/project-management/repositories/bank.service';
import { BankComponent } from './bank.component';
import { BankFormDialogComponent } from './components/bank-form-dialog/bank-form-dialog.component';
import { BankRoutingModule } from './routing/bank-routing.module';

@NgModule({
  declarations: [BankFormDialogComponent, BankComponent],
  imports: [CommonModule, BankRoutingModule, FormsModule, ReactiveFormsModule, MatComponentsModule, SharedModule, TranslateModule],
  providers: [BankService],
})
export class BankModule {}
