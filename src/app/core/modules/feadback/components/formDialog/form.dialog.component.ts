import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { TranslateService } from '@ngx-translate/core';
import { takeUntil, tap } from 'rxjs';
import { FormsDialogCommonFunctionality } from '../../../../../shared/classes/FormsDialog';
import { Client } from '../../../../data/project-management/models/client.model';
import { Feedback } from '../../../../data/project-management/models/feedback.model';
import { ClientService } from '../../../../data/project-management/repositories/client.service';
import { FeedbackService } from '../../../../data/project-management/repositories/feedback.service';
@Component({
  selector: 'app-form.dialog',
  templateUrl: './form.dialog.html',
  styleUrls: ['./form.dialog.css'],
})
export class FormDialogComponent extends FormsDialogCommonFunctionality implements OnInit, OnDestroy {
  ClientsDataSource: Client[] = [];
  clientLoading = false;
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Feedback,
    _databaseService: FeedbackService,
    private _client: ClientService,
    private _fb: FormBuilder,
    toastrService: ToastrService,
    translateService: TranslateService,
  ) {
    super(dialogRef, translateService, _databaseService, toastrService);
    this.Form = this._fb.group({
      id: [null],
      cleintId: [null, [Validators.required]],
      feedBack: [null],
      feedBackDate: [null],
    });
  }
  get cleintId(): FormControl {
    return this.Form.get('cleintId') as FormControl;
  }
  get feedBack(): FormControl {
    return this.Form.get('feedBack') as FormControl;
  }
  get feedBackDate(): FormControl {
    return this.Form.get('feedBackDate') as FormControl;
  }

  ngOnInit() {
    this.getAllClients();
  }

  getAllClients = () =>
    this._client
      .getAll()
      .pipe(
        tap(() => (this.clientLoading = true)),
        takeUntil(this.destroy$),
      )
      .subscribe({
        next: (data) => {
          this.ClientsDataSource = data.body;
        },
        complete: () => {
          this.clientLoading = false;
          if (this.data) {
            this.Form.patchValue(this.data);
          }
        },
      });

  setCleintId = (data: any) => this.cleintId.setValue(data);
}
