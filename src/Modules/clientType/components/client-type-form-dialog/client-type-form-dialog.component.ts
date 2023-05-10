import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {ClientTypeService} from '../../services/clientType.service';
import {FormsDialogCommonFunctionality} from 'src/Modules/shared/classes/FormsDialog';
import {TranslateService} from '@ngx-translate/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ClientType} from '../../interFaces/IclientType';
import {DialogServiceService} from 'src/Modules/shared/services/dialog-service.service';
import {ToastrService} from 'ngx-toastr';
import {Response} from 'src/Modules/shared/interfaces/Iresponse';

@Component({
	selector: 'app-client-type-form-dialog',
	templateUrl: './client-type-form-dialog.component.html',
	styleUrls: ['./client-type-form-dialog.component.css'],
})
export class ClientTypeFormDialogComponent extends FormsDialogCommonFunctionality implements OnInit, OnDestroy {
	Form: FormGroup;
	id!: number;
	controllerName: string = 'clientTypes';

	constructor(
		private _clientType: ClientTypeService,
		private fb: FormBuilder,
		translate: TranslateService,
		@Inject(MAT_DIALOG_DATA) public data: ClientType,
		private matDialogRef: MatDialogRef<ClientTypeFormDialogComponent>,
		private dialogService: DialogServiceService,
		public override toastr: ToastrService
	) {
		super(matDialogRef, dialogService, translate, _clientType, toastr);
		this.Form = this.fb.group({
			name: ['', [Validators.required, Validators.maxLength(100)]],
		});
	}
	get name(): FormControl {
		return this.Form.get('name') as FormControl;
	}
	ngOnInit(): void {
		if (this.data) this.Form.patchValue(this.data);
	}

	handleSubmit() {
		if (this.Form.valid) {
			if (this.data) this.update(this.data.id, this.Form.value);
			else this.add(this.Form.value);
		}
	}
}
