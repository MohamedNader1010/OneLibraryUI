import {Component, OnInit, OnDestroy} from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {ClientType} from 'src/Modules/clientType/interFaces/IclientType';
import {ClientTypeService} from 'src/Modules/clientType/services/clientType.service';
import {ClientService} from '../../services/client.service';
import {ToastrService} from 'ngx-toastr';

@Component({
	selector: 'app-add-edit',
	templateUrl: './add-edit.component.html',
	styleUrls: ['./add-edit.component.css'],
})
export class AddEditComponent implements OnInit, OnDestroy {
	subscriptions: Subscription[] = [];
	Form: FormGroup;
	id!: number;
	controllerName: string = 'clients';
	isSubmitted: boolean = false;
	ClientTypeDataSource: ClientType[] = [];
	constructor(private router: Router, private toastr: ToastrService, private route: ActivatedRoute, private _client: ClientService, private _clientType: ClientTypeService, private fb: FormBuilder) {
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
		this.subscriptions.push(this.route.queryParams.subscribe((params) => (this.id = params['id'])));
		if (this.id) this.getSingle(this.id);
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
	getSingle = (id: number) => this.subscriptions.push(this._client.GetById(id).subscribe((data) => this.Form.patchValue(data.body)));
	back = () => this.router.navigate([this.controllerName]);
	handleSubmit() {
		if (this.Form.valid) {
			if (this.id)
				this.subscriptions.push(
					this._client.update(this.id, this.Form.value).subscribe(() => {
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
