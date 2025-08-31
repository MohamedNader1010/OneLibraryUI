import { inject } from '@angular/core';
import { FormBuilder, FormControl } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Observer } from 'rxjs';
import { DestroyableComponentBase } from './destroyable-component-base.abstract';
import { TableCommunicationService } from '../services/table-communication.service';
import { TypedFormGroup } from '../../core/types/common.types';
import { UnitOfWorkService } from '../../core/services/unit-of-work.service';
import { MatDialogCommunicationService } from '../services/mat-dialog-communication.service';
import { mappers, enums, getEnumValues } from '../utilities/enum.utility';

export abstract class BaseForm<TFormType, TMatDialogRef, TDialogData = any> extends DestroyableComponentBase {
    tableCommunicationService = inject(TableCommunicationService);
    matDialogCommunicationService = inject(MatDialogCommunicationService);
    unitOfWorkService = inject(UnitOfWorkService);
    translateService = inject(TranslateService);
    toastrService = inject(ToastrService);
    fb = inject(FormBuilder);
    matDialogRef = inject(MatDialogRef<TMatDialogRef>);
    dialog = inject(MatDialog);
    data: TDialogData = inject(MAT_DIALOG_DATA);

    mappers = mappers;
    enums = enums;
    getEnumValues = getEnumValues;

    form!: TypedFormGroup<TFormType>;
    isSubmitting: boolean = false;
    isLoading: boolean = false;
    formDataIsLoading = false;

    abstract onInit(): void;
    abstract onDestroy(): void;
    abstract handleSubmit(): void;

    get id(): FormControl {
        return this.form.get('id') as FormControl;
    }

    closeDialogAndRefreshTable(): Observer<any> {
        return {
            next: (res) => {
                this.toastrService.success(res.message);
                this.matDialogRef.close({ data: res });
                this.tableCommunicationService.reload();
            },
            error: () => (this.isSubmitting = false),
            complete: () => {
                this.isSubmitting = false;
            }
        };
    }

    onNoClick = () => this.matDialogRef.close();

    baseOnInit(): void {
        this.onInit();
    }

    baseOnDestroy(): void {
        this.onDestroy();
        this.unitOfWorkService.unsubscribe();
    }
}
