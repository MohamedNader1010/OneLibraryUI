import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {MaterialService} from '../../services/material.service';

@Component({
	selector: 'app-add-edit',
	templateUrl: './add-edit.component.html',
	styleUrls: ['./add-edit.component.css'],
})
export class AddEditComponent implements OnInit, OnDestroy {
	subscriptions: Subscription[] = [];
	Form: FormGroup;
	id!: number;
	controllerName: string = 'materials';
	isSubmitted: boolean = false;
	constructor(private router: Router, private route: ActivatedRoute, private _material: MaterialService, private fb: FormBuilder) {
		this.Form = this.fb.group({
			name: ['', [Validators.required, Validators.maxLength(100)]],
			price: ['', [Validators.required]],
			quantity: ['', [Validators.required]],
		});
	}
	get name(): FormControl {
		return this.Form.get('name') as FormControl;
	}
	get price(): FormControl {
		return this.Form.get('price') as FormControl;
	}
	get quantity(): FormControl {
		return this.Form.get('quantity') as FormControl;
	}
	ngOnInit(): void {
		this.subscriptions.push(this.route.queryParams.subscribe((params) => {
			
			this.id = params['id']
			if (this.id) this.getSingle(this.id);
		}));
		
	}
	getSingle = (id: number) =>
		this.subscriptions.push(
			this._material.getOne(id).subscribe((data) => {
				console.log(data);
				
				this.Form.patchValue(data);
			})
		);
	back = () => this.router.navigate([this.controllerName]);
	handleSubmit() {
		if (this.Form.valid) {
			if (this.id)
				this.subscriptions.push(
					this._material.update(this.id, this.Form.value).subscribe(() => {
						this.isSubmitted = true;
						this.back();
					})
				);
			else
				this.subscriptions.push(
					this._material.add(this.Form.value).subscribe(() => {
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
