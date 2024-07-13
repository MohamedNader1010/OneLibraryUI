import { inject, Injectable } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { GenericService } from '../services/genericCRUD.service';
import { Observer } from 'rxjs';
import { ResponseDto } from '../interfaces/IResponse.dto';
import { ToastrService } from 'ngx-toastr';
import { FormControl, FormGroup } from '@angular/forms';
import { DatePipe } from '@angular/common';
import { TableCommunicationService } from '../components/table/table-communication.service';
@Injectable()
export class FormsDialogCommonFunctionality {
  Form!: FormGroup;
  isSubmitting: boolean = false;
  formDataIsLoading = false;

  tableCommunicationService = inject(TableCommunicationService);

  constructor(public matDialogRef: MatDialogRef<any>, public translateService: TranslateService, public databaseService: GenericService<any>, public toastrService: ToastrService) {}

  get id(): FormControl {
    return this.Form.get('id') as FormControl;
  }

  onNoClick = () => this.matDialogRef.close();

  addAndUpdateObserver(): Observer<ResponseDto> {
    return {
      next: (res) => {
        this.toastrService.success(res.message);
        this.matDialogRef.close({ data: res });
        this.tableCommunicationService.reloadTable$.next();
      },
      error: () => (this.isSubmitting = false),
      complete: () => {
        this.isSubmitting = false;
        console.log('complete');
      },
    };
  }

  public add = (values: any) => this.databaseService.add(values).subscribe(this.addAndUpdateObserver());

  public update = (id: number | string, values: any) => this.databaseService.update(id, values).subscribe(this.addAndUpdateObserver());

  handleSubmit(flag: boolean = false) {
    if (this.Form.valid) {
      if (flag) {
        this.Form.controls['checkOut'].setValue(this.formatDate(this.Form.controls['checkOut'].value));
        this.Form.controls['checkIn'].setValue(this.formatDate(this.Form.controls['checkIn'].value));
      }
      const id = this.id?.value;
      this.isSubmitting = true;
      if (id) this.update(id, this.Form.value);
      else this.add(this.Form.value);
    }
  }
  private formatDate(dateString: string): string {
    const datePipe = new DatePipe('en');
    return datePipe.transform(dateString, 'yyyy-MM-dd HH:mm:ss') || '';
  }
}
