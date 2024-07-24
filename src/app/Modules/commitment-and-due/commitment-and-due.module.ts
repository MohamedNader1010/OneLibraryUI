import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { CommitmentAndDueRoutingModule } from './commitment-and-due-routing.module';
import { CommitmentAndDueComponent } from './commitment-and-due.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { TranslateModule } from '@ngx-translate/core';
import { CommitmentAndDueFormDialogComponent } from './components/commitment-and-due-form-dialog/commitment-and-due-form-dialog.component';
import { CommitmentAndDueTransactionFormDialogComponent } from './components/commitment-and-due-transaction-form-dialog/commitment-and-due-transaction-form-dialog.component';
import { MatComponentsModule } from '../../shared/modules/mat-components.module';
import { SharedModule } from '../../shared/shared.module';

@NgModule({
  declarations: [CommitmentAndDueComponent, CommitmentAndDueFormDialogComponent, CommitmentAndDueTransactionFormDialogComponent],
  imports: [CommonModule, CommitmentAndDueRoutingModule, FormsModule, ReactiveFormsModule, MatComponentsModule, SharedModule, TranslateModule],
})
export class CommitmentAndDueModule {}
