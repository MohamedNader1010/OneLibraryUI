import {Component, OnInit, OnDestroy, Inject} from '@angular/core';
import {FormGroup, FormBuilder, FormControl} from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ToastrService} from 'ngx-toastr';
import {Subscription} from 'rxjs';
import {IncomesOutcomes} from '../../interfaces/Incomes-outcomes';
import {IncomesOutcomesService} from '../../services/Incomes-outcomes.service';
import {Response} from './../../../shared/interfaces/Iresponse';
import {Material} from './../../../material/interfaces/Imaterial';
import {IncomeOutcome} from '../../Enums/IncomeOutcomeEnum';
import {TranslateService} from '@ngx-translate/core';
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
		@Inject(MAT_DIALOG_DATA) public data: IncomesOutcomes,
		private _inOut: IncomesOutcomesService,
		private fb: FormBuilder,
		private toastr: ToastrService,
		public translate: TranslateService
	) {
		this.form = this.fb.group({
			// id: [null],
			status: [null],
			amount: [0],
			comment: [''],
		});
	}
	get amount(): FormControl {
		return this.form.get('amount') as FormControl;
	}
	get materialId(): FormControl {
		return this.form.get('materialId') as FormControl;
	}
	get status(): FormControl {
		return this.form.get('status') as FormControl;
	}

	ngOnInit() {
		if (this.data) {
			this.form.patchValue(this.data);
		}
	}

	onNoClick() {
		this.dialogRef.close();
	}

	handleSubmit() {
		if (this.form.valid) {
			this.isSubmitting = true;
			this.add();
		}
	}

	add() {
		this.status.setValue(this.amount.value > 0 ? IncomeOutcome.وارد : IncomeOutcome.صادر);
		this.subscriptions.push(
			this._inOut.add(this.form.value).subscribe({
				next: (res) => {
					this._inOut.dialogData = res.body;
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
