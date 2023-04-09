import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Router, ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import { ClientTypeService } from '../../services/clientType.service';
import { FormsDialogCommonFunctionality } from 'src/Modules/shared/classes/FormsDialog';
import { TranslateService } from '@ngx-translate/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ClientType } from '../../interFaces/IclientType';
import { DialogServiceService } from 'src/Modules/shared/services/dialog-service.service';

@Component({
  selector: 'app-client-type-form-dialog',
  templateUrl: './client-type-form-dialog.component.html',
  styleUrls: ['./client-type-form-dialog.component.css']
})
export class ClientTypeFormDialogComponent extends FormsDialogCommonFunctionality implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  Form: FormGroup;
  id!: number;
  controllerName: string = 'clientTypes';
  isSubmitted: boolean = false;
  isLoading = false;
  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private _clientType: ClientTypeService,
    private fb: FormBuilder,
    private translate: TranslateService,
    @Inject(MAT_DIALOG_DATA) public data: ClientType,
    private matDialogRef: MatDialogRef<ClientTypeFormDialogComponent>,
    private dialogService: DialogServiceService,
    private matDialogg: MatDialog
  ) {
    super(matDialogRef, dialogService, translate, matDialogg);
    this.Form = this.fb.group({
      name: ['', [Validators.required, Validators.maxLength(100)]],
    });
  }
  get name(): FormControl {
    return this.Form.get('name') as FormControl;
  }
  ngOnInit(): void {
    if (this.data) this.getSingle(this.data.id);
  }
  getSingle = (id: number) => {
    this.isLoading = true;
    this.subscriptions.push(
      this._clientType
        .getOne(id)
        .subscribe((data) => {
          this.isLoading = false;
          this.Form.patchValue(data)
        }
        ));
  }
  handleSubmit() {
    if (this.Form.valid) {
      if (this.data)
        this.subscriptions.push(
          this._clientType.update(this.data.id, this.Form.value).subscribe(() => {
            this.isSubmitted = true;
            this.back();
          })
        );
      else
        this.subscriptions.push(
          this._clientType.add(this.Form.value).subscribe(() => {
            this.isSubmitted = true;
            this.back();
          })
        );
    }
  }
  ngOnDestroy() {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}
