import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, FormControl, Validators } from '@angular/forms'
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog'
import { TranslateService } from '@ngx-translate/core'
import { ToastrService } from 'ngx-toastr'
import { Subscription } from 'rxjs'
import { Material } from 'src/Modules/material/interfaces/Imaterial'
import { TeacherProfit } from '../../interFaces/IteacherProfit'
import { Response } from 'src/Modules/shared/interfaces/Iresponse'
import { ClientService } from '../../services/client.service'

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
		@Inject(MAT_DIALOG_DATA) public data: TeacherProfit,
		private _client: ClientService,
		private fb: FormBuilder,
		private toastr: ToastrService,
		public translate: TranslateService
	) {
		this.form = this.fb.group({
			date: [new Date()],
			amount: [0,[Validators.min(0)]],
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
		this.subscriptions.push(
			this._client.addTeacherEarning(this.form.value).subscribe({
				next: (res) => {
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
