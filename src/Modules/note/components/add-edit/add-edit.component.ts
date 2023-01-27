import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {NoteService} from '../../services/note.service';
import {ToastrService} from 'ngx-toastr';
import {ClientService} from 'src/Modules/client/services/client.service';
import {ClientTypeService} from 'src/Modules/clientType/services/clientType.service';
import {Client} from 'src/Modules/client/interFaces/Iclient';
import {Note} from '../../interfaces/Inote';
import {ClientType} from 'src/Modules/clientType/interFaces/IclientType';

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
	isSubmitted: boolean = false;
	NotesDataSource: Note[] = [];
	TermsDataSource: any[] = [];
	StagesDataSource: any[] = [];
	ClientsDataSource: Client[] = [];
	ClientTypesDataSource: ClientType[] = [];
	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private _note: NoteService,
		private fb: FormBuilder,
		private toastr: ToastrService,
		private _client: ClientService,
		private _clientType: ClientTypeService
	) {
		this.Form = this.fb.group({
			name: ['', [Validators.required]],
			quantity: ['', [Validators.required]],
			actualPrice: ['', [Validators.required]],
			teacherPrice: ['', [Validators.required]],
			finalPrice: ['', [Validators.required]],
			clientId: ['', [Validators.required]],
			termId: ['', [Validators.required]],
			stageId: ['', [Validators.required]],
		});
	}
	ngOnInit(): void {
		this.getAllClientTypes();
		this.subscriptions.push(
			this.route.queryParams.subscribe((params) => {
				this.id = params['id'];
				if (this.id) this.getSingle(this.id);
			})
		);
	}
	changeClientType(data: any) {
		this.getAllClientsByType(data.value);
	}
	getAllClientsByType(id: number) {
		this.subscriptions.push(
			this._client.getAllByType(id).subscribe({
				next: (data) => {
					console.log('clients', data);

					this.ClientsDataSource = data;
				},
				error: (e) => {
					this.toastr.error(e.message, 'لايمكن تحميل ابيانات ');
				},
			})
		);
	}
	getAllClientTypes() {
		this.subscriptions.push(
			this._clientType.getAll().subscribe({
				next: (data) => {
					console.log('client types', data);
					this.ClientTypesDataSource = data;
				},
				error: (e) => {
					this.toastr.error(e.message, 'لايمكن تحميل ابيانات ');
				},
			})
		);
	}
	getSingle = (id: number) => this.subscriptions.push(this._note.getOne(id).subscribe((data) => this.Form.patchValue(data)));
	back = () => this.router.navigate([this.controllerName]);
	handleSubmit() {
		if (this.Form.valid) {
			if (this.id)
				this.subscriptions.push(
					this._note.update(this.id, this.Form.value).subscribe(() => {
						this.isSubmitted = true;
						this.back();
					})
				);
			else
				this.subscriptions.push(
					this._note.add(this.Form.value).subscribe(() => {
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
