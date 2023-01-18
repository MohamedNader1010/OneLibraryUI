import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {NoteService} from '../../services/note.service';

@Component({
	selector: 'app-add-edit',
	templateUrl: './add-edit.component.html',
	styleUrls: ['./add-edit.component.css'],
})
export class AddEditComponent implements OnInit, OnDestroy {
	subscriptions: Subscription[] = [];
	Form: FormGroup;
	id!: number;
	controllerName: string = 'notes';
	NotesDataSource: any[] = [];
	TermsDataSource: any[] = [];
	StagesDataSource: any[] = [];
	ClientsDataSource: any[] = [];
	constructor(private router: Router, private route: ActivatedRoute, private _note: NoteService, private fb: FormBuilder) {
		this.Form = this.fb.group({
			name: ['', [Validators.required]],
			quantity: ['', [Validators.required]],
			actualPrice: ['', [Validators.required]],
			teacherPrice: ['', [Validators.required]],
			finalPrice: ['', [Validators.required]],
			client: ['', [Validators.required]],
			term: ['', [Validators.required]],
			stage: ['', [Validators.required]],
		});
	}
	ngOnInit(): void {
		this.subscriptions.push(this.route.queryParams.subscribe((params) => (this.id = params['id'])));
		if (this.id) this.getSingle(this.id);
	}
	getSingle = (id: number) => this.subscriptions.push(this._note.getOne(id).subscribe((data) => this.Form.patchValue(data)));
	back = () => this.router.navigate([this.controllerName]);
	handleSubmit() {
		if (this.Form.valid) {
			if (this.id) this.subscriptions.push(this._note.update(this.id, this.Form.value).subscribe(() => this.back()));
			else this.subscriptions.push(this._note.add(this.Form.value).subscribe(() => this.back()));
		}
	}
	ngOnDestroy() {
		this.subscriptions.forEach((s) => s.unsubscribe());
	}
}
