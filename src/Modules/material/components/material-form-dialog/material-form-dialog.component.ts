import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Subscription} from 'rxjs';
import {MaterialService} from '../../services/material.service';
import {MAT_DIALOG_DATA, MatDialog, MatDialogRef} from '@angular/material/dialog';
import {Material} from '../../interfaces/Imaterial';
import {Response} from './../../../shared/interfaces/Iresponse';
import {ToastrService} from 'ngx-toastr';
import {TranslateService} from '@ngx-translate/core';
import {FormsDialogCommonFunctionality} from 'src/Modules/shared/classes/FormsDialog';
import {DialogServiceService} from 'src/Modules/shared/services/dialog-service.service';
@Component({
	selector: 'app-material-form-dialog',
	templateUrl: './material-form-dialog.component.html',
	styleUrls: ['./material-form-dialog.component.css'],
})
export class MaterialFormDialogComponent extends FormsDialogCommonFunctionality implements OnInit {
	subscriptions: Subscription[] = [];
	Form!: FormGroup;
	isSubmitting: boolean = false;

	constructor(
		@Inject(MAT_DIALOG_DATA) private data: Material,
		translate: TranslateService,
		dialogService: DialogServiceService,
		private _material: MaterialService,
		private fb: FormBuilder,
		private matDialogRef: MatDialogRef<MaterialFormDialogComponent>,
		private toastr: ToastrService
	) {
		super(matDialogRef, dialogService, translate);
		this.initiateFormControls();
	}

	get id(): FormControl {
		return this.Form.get('id') as FormControl;
	}
	get name(): FormControl {
		return this.Form.get('name') as FormControl;
	}
	get price(): FormControl {
		return this.Form.get('price') as FormControl;
	}

	private initiateFormControls() {
		this.Form = this.fb.group({
			id: [null],
			name: ['', [Validators.required, Validators.maxLength(100)]],
			price: [null, [Validators.required]],
		});
	}

	ngOnInit(): void {
		if (this.data) this.Form.patchValue(this.data);
	}

	handleSubmit() {
		if (this.Form.valid) {
			this.isSubmitting = true;
			if (this.id.value) this.update();
			else this.add();
		}
	}

	update() {
		this.subscriptions.push(
			this._material.update(this.id.value, this.Form.value).subscribe({
				next: (res) => {
					this._material.dialogData = res.body;
					this.matDialogRef.close({data: res});
				},
				error: (e) => {
					this.isSubmitting = false;
					let res: Response = e.error ?? e;
					this.toastr.error(res.message);
				},
				complete: () => {
					this.isSubmitting = false;
				},
			})
		);
	}

	add() {
		this.subscriptions.push(
			this._material.add(this.Form.value).subscribe({
				next: (res) => {
					this._material.dialogData = res.body;
					this.matDialogRef.close({data: res});
				},
				error: (e) => {
					this.isSubmitting = false;
					let res: Response = e.error ?? e;
					this.toastr.error(res.message);
				},
				complete: () => {
					this.isSubmitting = false;
				},
			})
		);
	}

	ngOnDestroy = () => this.subscriptions.forEach((s) => s.unsubscribe());
}
