import { inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { TableCommunicationService } from '../components/table/table-communication.service';
import { MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { Observer } from 'rxjs';
import { ResponseDto } from '../interfaces/response.dto';

export abstract class BaseForm {
  public Form!: FormGroup;
  public isSubmitting: boolean = false;
  public formDataIsLoading = false;

  public tableCommunicationService = inject(TableCommunicationService);
  public matDialogRef = inject(MatDialogRef<any>);
  public translateService = inject(TranslateService);
  public toastrService = inject(ToastrService);
  public fb = inject(FormBuilder);

  public get id(): FormControl {
    return this.Form.get('id') as FormControl;
  }

  closeDialogAndRefreshTable(): Observer<ResponseDto> {
    return {
      next: (res) => {
        this.toastrService.success(res.message);
        this.matDialogRef.close({ data: res });
        this.tableCommunicationService.reloadTable$.next();
      },
      error: () => (this.isSubmitting = false),
      complete: () => {
        this.isSubmitting = false;
      },
    };
  }

  public onNoClick = () => this.matDialogRef.close();

  public abstract handleSubmit(): void;
}
