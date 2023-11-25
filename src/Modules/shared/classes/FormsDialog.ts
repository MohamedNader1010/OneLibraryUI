import { Injectable } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { GenericService } from '../services/genericCRUD.service';
import { Observer, Subject, takeUntil } from 'rxjs';
import { ResponseDto } from '../interfaces/IResponse.dto';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup } from '@angular/forms';
@Injectable()
export class FormsDialogCommonFunctionality {
  destroy$ = new Subject<void>();
  Form!: FormGroup;
  isSubmitting: boolean = false;
  formDataIsLoading = false;
  constructor(public matDialogRef: MatDialogRef<any>, public translateService: TranslateService, public databaseService: GenericService<any>, public toastrService: ToastrService) {}

  get id(): FormControl {
    return this.Form.get('id') as FormControl;
  }

  onNoClick = () => this.matDialogRef.close();

  addAndUpdateObserver(): Observer<ResponseDto> {
    return {
      next: (res) => {
        this.databaseService.DialogData = res.body;
        this.matDialogRef.close({ data: res });
      },
      error: () => (this.isSubmitting = false),
      complete: () => {
        this.isSubmitting = false;
      },
    };
  }

  public add = (values: any) => this.databaseService.add(values).pipe(takeUntil(this.destroy$)).subscribe(this.addAndUpdateObserver());

  public update = (id: number | string, values: any) => this.databaseService.update(id, values).pipe(takeUntil(this.destroy$)).subscribe(this.addAndUpdateObserver());

  handleSubmit() {
    if (this.Form.valid) {
      const id = this.id?.value;
      this.isSubmitting = true;
      if (id) this.update(id, this.Form.value);
      else this.add(this.Form.value);
    }
  }

  ngOnDestroy(): void {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
