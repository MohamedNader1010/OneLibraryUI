import {Component, OnInit, OnDestroy, Inject} from '@angular/core';
import {FormGroup, FormBuilder, FormControl} from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ToastrService} from 'ngx-toastr';
import {Subscription} from 'rxjs';
import {IncomesOutcomesService} from '../../services/Incomes-outcomes.service';
import {Response} from './../../../shared/interfaces/Iresponse';
import {Material} from './../../../material/interfaces/Imaterial';
import {IncomeOutcomeStatus} from '../../../../Persistents/enums/IncomeOutcome.enum';
import {TranslateService} from '@ngx-translate/core';
import { IncomeOutcome } from "../../interFaces/Iincome-outcome";
import { IncomeOutcomeSource } from "../../../../Persistents/enums/IncomeOutcomeSource.emun";
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
  incomeOutcomeSources: any[] = [];
	constructor(
		public dialogRef: MatDialogRef<FormDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: IncomeOutcome,
		private _inOut: IncomesOutcomesService,
		private fb: FormBuilder,
		private toastr: ToastrService,
		public translate: TranslateService
	) {
    this.incomeOutcomeSources = [
      {value: IncomeOutcomeSource.IcoumeOutcome, name: 'اليومية'},
      {value: IncomeOutcomeSource.Bank, name: 'البنك'},
    ];
		this.form = this.fb.group({
			status: [null],
      source: [IncomeOutcomeSource.IcoumeOutcome],
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
	get source(): FormControl {
		return this.form.get('source') as FormControl;
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
		this.status.setValue(this.amount.value > 0 ? IncomeOutcomeStatus.وارد : IncomeOutcomeStatus.صادر);
		this.subscriptions.push(
			this._inOut.add(this.form.value).subscribe({
				next: (res) => {
					// if(this.source.value == IncomeOutcomeSource.IcoumeOutcome){
            this._inOut.DialogData = res.body;
          // }
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
