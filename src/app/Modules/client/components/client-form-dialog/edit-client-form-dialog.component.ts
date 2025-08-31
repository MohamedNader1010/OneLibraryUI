import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { BaseForm } from '../../../../shared/classes/base-form.abstract';
import { IClientOverviewDTO } from '../../../../core/models/Clients/dtos/client-overview-dto.interface';
import { CreateClientFormDialogComponent } from './create-client-form-dialog.component';
import { IUpdateClientCommand } from '../../../../core/models/Clients/commands/update-client-command.interface';
import { IClientTypeDTO } from '../../../../core/models/ClientTypes/dtos/client-type-dto.interface';

@Component({
    selector: 'app-edit-client-form-dialog',
    templateUrl: './client-form-dialog.component.html',
    styleUrls: ['./client-form-dialog.component.css']
})
export class EditClientFormDialogComponent extends BaseForm<
    IUpdateClientCommand,
    CreateClientFormDialogComponent,
    IClientOverviewDTO
> {
    ClientTypeDataSource: IClientTypeDTO[] = [];

    onInit(): void {
        this.form = this.fb.group({
            id: this.fb.nonNullable.control(this.data.id, { validators: [Validators.required] }),
            name: this.fb.nonNullable.control(this.data.name, { validators: [Validators.required, Validators.maxLength(100)] }),
            phoneNumber: this.fb.nonNullable.control(this.data.phoneNumber, {
                validators: [Validators.required, Validators.pattern('01[0125][0-9]{8}')]
            }),
            clientTypeId: this.fb.nonNullable.control(this.data.clientType.id, { validators: [Validators.required] })
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
        this.unitOfWorkService.client.edit(this.form.getRawValue()).subscribe(this.closeDialogAndRefreshTable());
    }

    onDestroy() {}
}
