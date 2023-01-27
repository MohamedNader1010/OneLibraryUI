import {Component, OnInit, OnDestroy} from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {Employee} from '../../interFaces/Iemployee';
import {EmployeeService} from '../../services/employee.service';

@Component({
	selector: 'app-add-edit',
	templateUrl: './add-edit.component.html',
	styleUrls: ['./add-edit.component.css'],
})
export class AddEditComponent implements OnInit, OnDestroy {
	subscriptions: Subscription[] = [];
	Form: FormGroup;
	id!: number;
	controllerName: string = 'employees';
	isSubmitted: boolean = false;
	constructor(private router: Router, private route: ActivatedRoute, private _employee: EmployeeService, private fb: FormBuilder) {
		this.Form = this.fb.group({
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
	getSingle = (id: number) =>
		this.subscriptions.push(
			this._employee.getOne(id).subscribe((data: Employee[]) => {
				console.log(data[0]);
				this.Form.patchValue(data[0]);
			})
		);
	back = () => this.router.navigate([this.controllerName]);
	handleSubmit() {
		if (this.Form.valid) {
			if (this.id)
				this.subscriptions.push(
					this._employee.update(this.id, this.Form.value).subscribe(() => {
						this.isSubmitted = true;
						this.back();
					})
				);
			else
				this.subscriptions.push(
					this._employee.add(this.Form.value).subscribe(() => {
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
