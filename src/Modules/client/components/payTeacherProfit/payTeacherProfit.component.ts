import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { TranslateService } from '@ngx-translate/core'
import { ToastrService } from 'ngx-toastr'
import { Subscription } from 'rxjs'
import { Material } from 'src/Modules/material/interfaces/Imaterial'
import { Response } from 'src/Modules/shared/interfaces/Iresponse'
import { ClientService } from '../../services/client.service'
import { TeacherProfitResponse } from "../../interFaces/IteacherProfitResponse"

@Component({
  selector: 'app-payTeacherProfit',
  templateUrl: './payTeacherProfit.component.html',
  styleUrls: ['./payTeacherProfit.component.css']
})
export class PayTeacherProfitComponent  implements OnInit, OnDestroy {
	subscriptions: Subscription[] = [];
	form: FormGroup;
	isSubmitting: boolean = false;
	MaterialDataSource: Material[] = [];
	constructor(
		public dialogRef: MatDialogRef<PayTeacherProfitComponent>,
		@Inject(MAT_DIALOG_DATA) public data: TeacherProfitResponse,
		private _client: ClientService,
		private fb: FormBuilder,
		private toastr: ToastrService,
		public translate: TranslateService
	) {
		this.form = this.fb.group({
			date: [new Date()],
			amount: [null,[Validators.min(0.1)]],
			clientId: [null],
		});
	}
	get amount(): FormControl {
		return this.form.get('amount') as FormControl;
	}
	get clientId(): FormControl {
		return this.form.get('clientId') as FormControl;
	}

	ngOnInit() {
			this.clientId.setValue(this.data.clientId);
			this.amount.addValidators(Validators.max(this.data.rest));
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
		this.subscriptions.push(
			this._client.addTeacherEarning(this.form.value).subscribe({
				next: (res) => {
					this.data.paidToTeacher += this.amount.value;
					this.data.rest -= this.amount.value;
					this.dialogRef.close({res: res, row: this.data});
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
