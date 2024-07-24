import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { BankFormDialogComponent } from './components/bank-form-dialog/bank-form-dialog.component';
import { BankComponent } from './bank.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { BankService } from '../../core/data/services/bank.service';
import { MatComponentsModule } from '../../shared/modules/mat-components.module';
import { SharedModule } from '../../shared/shared.module';
import { BankRoutingModule } from './bank-routing.module';

@NgModule({
  declarations: [BankFormDialogComponent, BankComponent],
  imports: [CommonModule, BankRoutingModule, FormsModule, ReactiveFormsModule, MatComponentsModule, SharedModule, TranslateModule],
  providers: [BankService],
})
export class BankModule {}
