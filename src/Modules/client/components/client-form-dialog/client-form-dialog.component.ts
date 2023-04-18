import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormControl } from '@angular/forms';
import { Subscription } from 'rxjs';
import { ClientType } from 'src/Modules/clientType/interFaces/IclientType';
import { ClientTypeService } from 'src/Modules/clientType/services/clientType.service';
import { ClientService } from '../../services/client.service';
import { ToastrService } from 'ngx-toastr';
import { FormsDialogCommonFunctionality } from 'src/Modules/shared/classes/FormsDialog';
import { TranslateService } from '@ngx-translate/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Client } from '../../interFaces/Iclient';
import { DialogServiceService } from 'src/Modules/shared/services/dialog-service.service';
import { Response } from 'src/Modules/shared/interfaces/Iresponse';

@Component({
	selector: 'app-client-form-dialog',
	templateUrl: './client-form-dialog.component.html',
	styleUrls: ['./client-form-dialog.component.css'],
})
export class ClientFormDialogComponent extends FormsDialogCommonFunctionality implements OnInit, OnDestroy {
	Form: FormGroup;
	ClientTypeDataSource: ClientType[] = [];
	isLoading = false;
	constructor(
		public override toastr: ToastrService,
		private _client: ClientService,
		private _clientType: ClientTypeService,
		private fb: FormBuilder,
		private translate: TranslateService,
		@Inject(MAT_DIALOG_DATA) public data: Client,
		private matDialogRef: MatDialogRef<ClientFormDialogComponent>,
		private dialogService: DialogServiceService,
	) {
		super(matDialogRef, dialogService, translate, _client, toastr);
		this.Form = this.fb.group({
			name: ['', [Validators.required, Validators.maxLength(100)]],
			phoneNumber: ['', [Validators.required, Validators.pattern('01[0125][0-9]{8}')]],
			clientTypeId: ['', [Validators.required]],
		});
	}
	get name(): FormControl {
		return this.Form.get('name') as FormControl;
	}
	get phone(): FormControl {
		return this.Form.get('phoneNumber') as FormControl;
	}
	get clientTypeId(): FormControl {
		return this.Form.get('clientTypeId') as FormControl;
	}
	ngOnInit(): void {
		this.getAllClientTypes()
		if (this.data) this.Form.patchValue(this.data);
	}
	getAllClientTypes = () =>
		this.subscriptions.push(
			this._clientType.getAll().subscribe({
				next: (data) => {
					this.ClientTypeDataSource = data.body;
				},
				error: (e) => {
					this.toastr.error(e.message,this.tranlsate.instant('error.cantLoadData'));
				},
			})
		);
	handleSubmit() {
		if (this.Form.valid) {
			if (this.data)
				this.update(this.data.id, this.Form.value)
			else
				this.add(this.Form.value)
		}
	}

	
}
