import {Component, OnInit, OnDestroy, Inject} from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ToastrService} from 'ngx-toastr';
import {Subscription} from 'rxjs';
import {Response} from './../../../shared/interfaces/Iresponse';
import {FeadbackService} from '../../services/feadback.service';
import {Feadback} from '../../interfaces/feadback';
import {ClientService} from './../../../client/services/client.service';
import {Client} from './../../../client/interFaces/Iclient';
@Component({
	selector: 'app-form.dialog',
	templateUrl: './form.dialog.html',
	styleUrls: ['./form.dialog.css'],
})
export class FormDialogComponent implements OnInit, OnDestroy {
	subscriptions: Subscription[] = [];
	form: FormGroup;
	isSubmitting: boolean = false;
	ClientsDataSource: Client[] = [];
	constructor(
		public dialogRef: MatDialogRef<FormDialogComponent>,
		@Inject(MAT_DIALOG_DATA) public data: Feadback,
		private _feedback: FeadbackService,
		private _client: ClientService,
		private fb: FormBuilder,
		private toastr: ToastrService
	) {
		this.form = this.fb.group({
			id: [null],
			cleintId: [null, [Validators.required]],
			feedBack: [null],
			feedBackDate: [null],
		});
	}
	get id(): FormControl {
		return this.form.get('id') as FormControl;
	}
	get cleintId(): FormControl {
		return this.form.get('cleintId') as FormControl;
	}
	get feedBack(): FormControl {
		return this.form.get('feedBack') as FormControl;
	}
	get feedBackDate(): FormControl {
		return this.form.get('feedBackDate') as FormControl;
	}

	ngOnInit() {
		this.getAllClients();
	}

	getAllClients = () =>
		this.subscriptions.push(
			this._client.getAll().subscribe({
				next: (data) => {
					this.ClientsDataSource = data.body;
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

	handleSubmit() {
		if (this.form.valid) {
			this.isSubmitting = true;
			if (this.id.value) this.update();
			else this.add();
		}
	}

	update() {
		this.subscriptions.push(
			this._feedback.update(this.id.value, this.form.value).subscribe({
				next: (res) => {
					this._feedback.dialogData = res.body;
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

	add() {
		this.subscriptions.push(
			this._feedback.add(this.form.value).subscribe({
				next: (res) => {
					this._feedback.dialogData = res.body;
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
