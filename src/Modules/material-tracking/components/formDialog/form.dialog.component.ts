import {Component, OnInit, OnDestroy, Inject} from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ToastrService} from 'ngx-toastr';
import {Subscription} from 'rxjs';
import {MaterialTracking} from '../../interfaces/materialTracking';
import {MaterialTrackingService} from '../../services/materialTracking.service';
import {Response} from './../../../shared/interfaces/Iresponse';
import {MaterialService} from './../../../material/services/material.service';
import {Material} from './../../../material/interfaces/Imaterial';
import {TranslateService} from '@ngx-translate/core';
import { IncomeOutcomeStatus } from "../../../../Persistents/enums/IncomeOutcome.enum";
@Component({
	selector: 'app-form.dialog',
	templateUrl: './form.dialog.html',
	styleUrls: ['./form.dialog.css'],
})
export class FormDialogComponent implements OnInit, OnDestroy {
	subscriptions: Subscription[] = [];
	form: FormGroup;
	isSubmitting: boolean = false;
	MaterialDataSource: Material[] = [];
	constructor(
		public dialogRef: MatDialogRef<FormDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: MaterialTracking,
		private _matTracking: MaterialTrackingService,
		private _mat: MaterialService,
		private fb: FormBuilder,
		public translate: TranslateService,
		private toastr: ToastrService
	) {
		this.form = this.fb.group({
			id: [null],
			materialId: [null, [Validators.required]],
			status: [null],
			quantity: [0],
			comment: [''],
		});
	}
	get id(): FormControl {
		return this.form.get('id') as FormControl;
	}
	get quantity(): FormControl {
		return this.form.get('quantity') as FormControl;
	}
	get materialId(): FormControl {
		return this.form.get('materialId') as FormControl;
	}
	get status(): FormControl {
		return this.form.get('status') as FormControl;
	}

	ngOnInit() {
		this.getAllMaterial();
	}

	getAllMaterial = () =>
		this.subscriptions.push(
			this._mat.getAll().subscribe({
				next: (data) => {
					this.MaterialDataSource = data.body;
				},
				error: (e) => {
					let res: Response = e.error ?? e;
					this.toastr.error(res.message);
				},
				complete: () => {
					if (this.data) {
						this.form.patchValue(this.data);
					}
				},
			})
		);

	onNoClick() {
		this.dialogRef.close();
	}

	setMaterialId = (data: any) => this.materialId.setValue(data);

	handleSubmit() {
		if (this.form.valid) {
			this.isSubmitting = true;
			this.add();
		}
	}

	add() {
		this.status.setValue(this.quantity.value > 0 ? IncomeOutcomeStatus.وارد : IncomeOutcomeStatus.صادر);
		this.subscriptions.push(
			this._matTracking.add(this.form.value).subscribe({
				next: (res: Response) => {
          if(this.status.value === IncomeOutcomeStatus.وارد)
					  this._matTracking.DialogData = res.body;
					this.dialogRef.close({data: res});
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
