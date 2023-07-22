import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { BankRoutingModule } from './routing/bank-routing.module';
import { BankFormDialogComponent } from './components/bank-form-dialog/bank-form-dialog.component';
import { BankComponent } from "./bank.component";
import { MatComponentsModule } from "../mat-components.Module/mat-components.module";
import { FormsModule, ReactiveFormsModule } from "@angular/forms";
import { TranslateModule } from "@ngx-translate/core";
import { SharedModule } from "../shared/shared.module";
import { BankService } from "./services/bank.service";


@NgModule({
  declarations: [
    BankFormDialogComponent,
    BankComponent
  ],
  imports: [
    CommonModule,
    BankRoutingModule,
		FormsModule,
		ReactiveFormsModule,
		MatComponentsModule,
		SharedModule,
		TranslateModule
  ],
  providers: [BankService]
})
export class BankModule { }
