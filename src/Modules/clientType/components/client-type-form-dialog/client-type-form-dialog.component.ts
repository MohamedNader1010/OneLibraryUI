import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, Validators} from '@angular/forms';
import {ClientTypeService} from '../../services/clientType.service';
import {FormsDialogCommonFunctionality} from 'src/Modules/shared/classes/FormsDialog';
import {TranslateService} from '@ngx-translate/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {ClientType} from '../../interFaces/IclientType';
import {ToastrService} from 'ngx-toastr';

@Component({
	selector: 'app-client-type-form-dialog',
	templateUrl: './client-type-form-dialog.component.html',
	styleUrls: ['./client-type-form-dialog.component.css'],
})
export class ClientTypeFormDialogComponent extends FormsDialogCommonFunctionality implements OnInit, OnDestroy {
	id!: number;
	controllerName: string = 'clientTypes';

	constructor(
		_clientType: ClientTypeService,
		private fb: FormBuilder,
		translate: TranslateService,
		@Inject(MAT_DIALOG_DATA) public data: ClientType,
		matDialogRef: MatDialogRef<ClientTypeFormDialogComponent>,
		toastr: ToastrService
	) {
		super(matDialogRef, translate, _clientType, toastr);
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
