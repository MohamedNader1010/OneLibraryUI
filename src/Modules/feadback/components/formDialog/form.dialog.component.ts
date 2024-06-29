import {Component, OnInit, OnDestroy, Inject} from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { FeedbackService } from '../../services/feedback.service';
import { Feedback } from '../../interfaces/feedback';
import { ClientService } from './../../../client/services/client.service';
import { Client } from './../../../client/interFaces/Iclient';
import { FormsDialogCommonFunctionality } from '../../../shared/classes/FormsDialog';
import { TranslateService } from '@ngx-translate/core';

@Component({
  selector: 'app-form.dialog',
  templateUrl: './form.dialog.html',
  styleUrls: ['./form.dialog.css'],
})
export class FormDialogComponent extends FormsDialogCommonFunctionality implements OnDestroy {
  ClientsDataSource: Client[] = [];
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Feedback,
    _databaseService: FeedbackService,
    public client: ClientService,
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
  get clientId(): FormControl {
    return this.Form.get('cleintId') as FormControl;
  }
  get feedBack(): FormControl {
    return this.Form.get('feedBack') as FormControl;
  }
  get feedBackDate(): FormControl {
    return this.Form.get('feedBackDate') as FormControl;
  }

  setClientId = (data: any) => this.clientId.setValue(data);
}
