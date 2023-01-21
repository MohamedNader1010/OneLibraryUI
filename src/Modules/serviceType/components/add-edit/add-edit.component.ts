import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {ServiceType} from '../../interFaces/IserviceType';
import {ServicesTypeService} from '../../services/serviceType.service';

@Component({
	selector: 'app-add-edit',
	templateUrl: './add-edit.component.html',
	styleUrls: ['./add-edit.component.css'],
})
export class AddEditComponent implements OnInit, OnDestroy {
	subscriptions: Subscription[] = [];
	Form: FormGroup;
	id!: number;
	controllerName: string = 'serviceTypes';
	isSubmitted: boolean = false;
	constructor(private router: Router, private route: ActivatedRoute, private _serviceType: ServicesTypeService, private fb: FormBuilder) {
		this.Form = this.fb.group({
			id: '',
			name: ['', [Validators.required, Validators.maxLength(100)]],
		});
	}
	get name(): FormControl {
		return this.Form.get('name') as FormControl;
	}
	ngOnInit(): void {
		this.subscriptions.push(this.route.queryParams.subscribe((params) => (this.id = params['id'])));
		if (this.id) this.getSingle(this.id);
	}
	getSingle = (id: number) => this.subscriptions.push(this._serviceType.getOne(id).subscribe((data: ServiceType[]) => this.Form.patchValue(data[0])));
	back = () => this.router.navigate([this.controllerName]);
	handleSubmit() {
		if (this.Form.valid) {
			if (this.id)
				this.subscriptions.push(
					this._serviceType.update(this.id, this.Form.value).subscribe(() => {
						this.isSubmitted = true;
						this.back();
					})
				);
			else
				this.subscriptions.push(
					this._serviceType.add(this.Form.value).subscribe(() => {
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
