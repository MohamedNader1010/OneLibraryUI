import { Component } from '@angular/core';
import { Validators } from '@angular/forms';
import { ICreateTeacherCommand } from '../../../../core/models/Teachers/commands/create-teacher-command.interface';
import { ITeacherOverviewDTO } from '../../../../core/models/Teachers/dtos/teacher-overview-dto.interface';
import { BaseForm } from '../../../../shared/classes/base-form.abstract';

@Component({
    selector: 'app-create-teacher-form-dialog',
    templateUrl: './teacher-form-dialog.component.html',
    styleUrls: ['./teacher-form-dialog.component.css']
})
export class CreateTeacherFormDialogComponent extends BaseForm<
    ICreateTeacherCommand,
    CreateTeacherFormDialogComponent,
    ITeacherOverviewDTO
> {
    onInit(): void {
        this.form = this.fb.group({
            name: this.fb.nonNullable.control('', { validators: [Validators.required, Validators.maxLength(100)] }),
            phoneNumber: this.fb.nonNullable.control('', {
                validators: [Validators.required, Validators.pattern('01[0125][0-9]{8}')]
            })
        });
    }

    handleSubmit() {
        if (!this.form.valid) return;
        this.isSubmitting = true;
        this.unitOfWorkService.teacher.add(this.form.getRawValue()).subscribe(this.closeDialogAndRefreshTable());
    }

    onDestroy(): void {
        console.log(`component ${this.constructor.name} destroyed`);
    }
}
