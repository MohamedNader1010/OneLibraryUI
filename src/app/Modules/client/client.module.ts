import { TranslateModule } from '@ngx-translate/core';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatComponentsModule } from '../../shared/mat-components.module';
import { SharedModule } from '../../shared/shared.module';
import { ClientRoutingModule } from './client-routing.module';
import { ClientComponent } from './client.component';
import { ClientBulkPaymentFormComponent } from './components/client-bulk-payment-form/client-bulk-payment-form.component';
import { EditClientFormDialogComponent } from './components/client-form-dialog/edit-client-form-dialog.component';
import { CreateClientFormDialogComponent } from './components/client-form-dialog/create-client-form-dialog.component';
import { ClientDetailsComponent } from './components/client-details/client-details.component';
import { AccountingModule } from '../accounting/accounting.module';

@NgModule({
    declarations: [
        ClientComponent,
        CreateClientFormDialogComponent,
        EditClientFormDialogComponent,
        ClientBulkPaymentFormComponent,
        ClientDetailsComponent
    ],
    imports: [
        FormsModule,
        ReactiveFormsModule,
        CommonModule,
        ClientRoutingModule,
        MatComponentsModule,
        SharedModule,
        TranslateModule,
        AccountingModule
    ]
})
export class ClientModule {}
