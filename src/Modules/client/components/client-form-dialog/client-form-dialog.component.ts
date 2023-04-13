import {Component, OnInit, OnDestroy, Inject} from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {ClientType} from 'src/Modules/clientType/interFaces/IclientType';
import {ClientTypeService} from 'src/Modules/clientType/services/clientType.service';
import {ClientService} from '../../services/client.service';
import {ToastrService} from 'ngx-toastr';
import {FormsDialogCommonFunctionality} from 'src/Modules/shared/classes/FormsDialog';
import {TranslateService} from '@ngx-translate/core';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Client} from '../../interFaces/Iclient';
import {DialogServiceService} from 'src/Modules/shared/services/dialog-service.service';

@Component({
	selector: 'app-client-form-dialog',
	templateUrl: './client-form-dialog.component.html',
	styleUrls: ['./client-form-dialog.component.css'],
})
export class ClientFormDialogComponent extends FormsDialogCommonFunctionality implements OnInit, OnDestroy {
	subscriptions: Subscription[] = [];
	Form: FormGroup;
	controllerName: string = 'clients';
	isSubmitted: boolean = false;
	ClientTypeDataSource: ClientType[] = [];
	isLoading = false;
	constructor(
		private toastr: ToastrService,
		private _client: ClientService,
		private _clientType: ClientTypeService,
		private fb: FormBuilder,
		private translate: TranslateService,
		@Inject(MAT_DIALOG_DATA) public data: Client,
		private matDialogRef: MatDialogRef<ClientFormDialogComponent>,
		private dialogService: DialogServiceService,
		private matDialogg: MatDialog
	) {
		super(matDialogRef, dialogService, translate, matDialogg);
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
		this.getAllClientTypes();
		if (this.data) this.getSingle(this.data.id);
	}
	getAllClientTypes = () =>
		this.subscriptions.push(
			this._clientType.getAll().subscribe({
				next: (data) => {
					this.ClientTypeDataSource = data.body;
				},
				error: (e) => {
					this.toastr.error(e.message, 'لايمكن تحميل ابيانات ');
				},
			})
		);
	getSingle = (id: number) => {
		this.isLoading = true;
		this.subscriptions.push(
			this._client.GetById(id).subscribe((data) => {
				this.isLoading = false;
				this.Form.patchValue(data.body);
			})
		);
	};
	handleSubmit() {
		if (this.Form.valid) {
			if (this.data)
				this.subscriptions.push(
					this._client.update(this.data.id, this.Form.value).subscribe(() => {
						this.isSubmitted = true;
						this.back();
					})
				);
			else
				this.subscriptions.push(
					this._client.add(this.Form.value).subscribe(() => {
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
