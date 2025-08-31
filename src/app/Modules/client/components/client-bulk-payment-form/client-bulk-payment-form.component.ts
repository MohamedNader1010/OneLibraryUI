import { Component } from '@angular/core';
import { BaseForm } from '../../../../shared/classes/base-form.abstract';
import { IPayBulkOrdersCommand } from '../../../../core/models/Clients/commands/pay-bulk-orders-command.interface';
import { IClientOverviewDTO } from '../../../../core/models/Clients/dtos/client-overview-dto.interface';
import { Validators } from '@angular/forms';
import { PaymentMethod } from "../../../../core/enums/payment-method.enum";

@Component({
    selector: 'app-client-bulk-payment-form',
    templateUrl: './client-bulk-payment-form.component.html'
})
export class ClientBulkPaymentFormComponent extends BaseForm<
    IPayBulkOrdersCommand,
    ClientBulkPaymentFormComponent,
    IClientOverviewDTO
> {
    onInit() {
        this.form = this.fb.group({
            clientId: this.fb.nonNullable.control<string>(this.data.id, { validators: Validators.required }),
            amount: this.fb.nonNullable.control<number>(0, { validators: [Validators.required, Validators.min(1)] }),
            paymentMethod: this.fb.nonNullable.control<PaymentMethod>(PaymentMethod.Cash, { validators: Validators.required })
        });
    }

    handleSubmit() {
        if (this.form.valid) {
            this.isSubmitting = true;
            this.unitOfWorkService.client.bulkPayment(this.form.getRawValue()).subscribe(this.closeDialogAndRefreshTable());
        }
    }

    onDestroy() {}
}
