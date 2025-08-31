import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { BaseForm } from '../../../../shared/classes/base-form.abstract';
import { ICreateClientCommand } from '../../../../core/models/Clients/commands/create-client-command.interface';
import { IClientOverviewDTO } from '../../../../core/models/Clients/dtos/client-overview-dto.interface';
import { IClientTypeDTO } from '../../../../core/models/ClientTypes/dtos/client-type-dto.interface';

@Component({
    selector: 'app-create-client-form-dialog',
    templateUrl: './client-form-dialog.component.html',
    styleUrls: ['./client-form-dialog.component.css']
})
export class CreateClientFormDialogComponent extends BaseForm<
    ICreateClientCommand,
    CreateClientFormDialogComponent,
    IClientOverviewDTO
> {
    ClientTypeDataSource: IClientTypeDTO[] = [];

    onInit(): void {
        this.form = this.fb.group({
            name: this.fb.nonNullable.control('', { validators: [Validators.required, Validators.maxLength(100)] }),
            phoneNumber: this.fb.nonNullable.control('', {
                validators: [Validators.required, Validators.pattern('01[0125][0-9]{8}')]
            }),
            clientTypeId: this.fb.nonNullable.control('', { validators: [Validators.required] })
        });
        this.getAllClientTypes();
    }

    getAllClientTypes = () =>
        this.unitOfWorkService.clientType.getAll().subscribe({
            next: (response) => {
                this.ClientTypeDataSource = response.data;
            }
        });

    handleSubmit() {
        if (!this.form.valid) return;
        this.isSubmitting = true;
        this.unitOfWorkService.client.add(this.form.getRawValue()).subscribe(this.closeDialogAndRefreshTable());
    }

    onDestroy(): void {
        console.log(`component ${this.constructor.name} destroyed`);
    }
}
