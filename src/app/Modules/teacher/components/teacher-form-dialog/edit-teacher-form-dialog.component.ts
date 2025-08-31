import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { IUpdateTeacherCommand } from '../../../../core/models/Teachers/commands/update-teacher-command.interface';
import { ITeacherOverviewDTO } from '../../../../core/models/Teachers/dtos/teacher-overview-dto.interface';
import { BaseForm } from '../../../../shared/classes/base-form.abstract';

@Component({
    selector: 'app-edit-teacher-form-dialog',
    templateUrl: './teacher-form-dialog.component.html',
    styleUrls: ['./teacher-form-dialog.component.css']
})
export class EditTeacherFormDialogComponent extends BaseForm<
    IUpdateTeacherCommand,
    EditTeacherFormDialogComponent,
    ITeacherOverviewDTO
> {
    onInit(): void {
        this.form = this.fb.group({
            id: this.fb.nonNullable.control(this.data.id, { validators: [Validators.required] }),
            name: this.fb.nonNullable.control(this.data.name, { validators: [Validators.required, Validators.maxLength(100)] }),
            phoneNumber: this.fb.nonNullable.control(this.data.phoneNumber, {
                validators: [Validators.required, Validators.pattern('01[0125][0-9]{8}')]
            })
        });
    }

    handleSubmit() {
        if (!this.form.valid) return;
        this.isSubmitting = true;
        this.unitOfWorkService.teacher.edit(this.form.getRawValue()).subscribe(this.closeDialogAndRefreshTable());
    }

    onDestroy() {}
}
