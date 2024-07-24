import { Component, Inject } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { Client } from '../../../../core/data/models/client/Iclient';
import { Feedback } from '../../../../core/data/models/feedback/feedback';
import { ClientService } from '../../../../core/data/services/client.service';
import { FeedbackService } from '../../../../core/data/services/feedback.service';
import { BaseForm } from '../../../../shared/classes/base-form.abstract';

@Component({
  selector: 'app-form.dialog',
  templateUrl: './form.dialog.html',
  styleUrls: ['./form.dialog.css'],
})
export class ClientFeedbackFormDialogComponent extends BaseForm {
  ClientsDataSource: Client[] = [];
  constructor(
    override matDialogRef: MatDialogRef<ClientFeedbackFormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: Feedback,
    private _databaseService: FeedbackService,
    public client: ClientService,
  ) {
    super();
    this.Form = this.fb.group({
      id: [null],
      clientId: [null, [Validators.required]],
      feedBack: [null],
      feedBackDate: [null],
    });
  }
  get clientId(): FormControl {
    return this.Form.get('clientId') as FormControl;
  }
  get feedBack(): FormControl {
    return this.Form.get('feedBack') as FormControl;
  }
  get feedBackDate(): FormControl {
    return this.Form.get('feedBackDate') as FormControl;
  }

  setClientId = (data: any) => this.clientId.setValue(data);

  add = (values: any) => this._databaseService.add(values).subscribe(this.closeDialogAndRefreshTable());

  update = (id: number, values: any) => this._databaseService.update(id, values).subscribe(this.closeDialogAndRefreshTable());

  handleSubmit() {
    if (!this.Form.valid) return;
    this.isSubmitting = true;
    const id = this.id?.value;
    id ? this.update(id, this.Form.value) : this.add(this.Form.value);
  }
}
