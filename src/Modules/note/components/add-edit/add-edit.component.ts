import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormArray, FormBuilder, FormGroup, Validators, FormControl} from '@angular/forms';
import {Router, ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {NoteService} from '../../services/note.service';
import {ToastrService} from 'ngx-toastr';
import {ClientService} from 'src/Modules/client/services/client.service';
import {ClientTypeService} from 'src/Modules/clientType/services/clientType.service';
import {Client} from 'src/Modules/client/interFaces/Iclient';
import {ClientType} from 'src/Modules/clientType/interFaces/IclientType';
import {Stage} from '../../interfaces/IStage';
import {Term} from '../../interfaces/ITerm';
import {NoteComponent} from '../../interfaces/noteComponent';
import {Service} from 'src/Modules/service/interfaces/Iservice';
import {ServicesService} from 'src/Modules/service/services/services.service';
import {Note} from '../../interfaces/Inote';

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
	NoteComponentsDataSource: NoteComponent[] = [];
	TermsDataSource: Term[] = [];
	StagesDataSource: Stage[] = [];
	ClientsDataSource: Client[] = [];
	ClientTypesDataSource: ClientType[] = [];
	ServicesDataSource: Service[] = [];
	constructor(
		private router: Router,
		private route: ActivatedRoute,
		private _note: NoteService,
		private fb: FormBuilder,
		private toastr: ToastrService,
		private _client: ClientService,
		private _clientType: ClientTypeService,
		private _service: ServicesService
	) {
		this.Form = this.createFormItem('init');
	}
	ngOnInit(): void {
		this.getAllClientTypes();
		this.getTerms();
		this.getSTages();
		this.getAllServices();
		this.subscriptions.push(
			this.route.queryParams.subscribe((params) => {
				this.id = params['id'];
				if (this.id) this.getSingle(this.id);
			})
		);
	}
	createFormItem(type: string): FormGroup {
		let formItem: FormGroup = this.fb.group({});
		switch (type) {
			case 'init':
				formItem = this.fb.group({
					name: ['', [Validators.required]],
					originalPrice: [{value: '', disabled: true}],
					earning: [{value: '', disabled: true}],
					actualPrice: [{value: ''}],
					teacherPrice: ['', [Validators.required]],
					finalPrice: [{value: '', disabled: true}],
					clientTypeId: [''], ///////////////////////////////
					clientId: ['', [Validators.required]],
					termId: ['', [Validators.required]],
					stageId: ['', [Validators.required]],
					noteComponents: this.fb.array([]),
				});
				break;
			case 'noteComponent':
				formItem = this.fb.group({
					serviceId: ['', [Validators.required]],
					quantity: ['', [Validators.required]],
				});
				break;
		}
		return formItem;
	}
	fillFormWithData(datasource: Note) {
		// datasource.noteComponents.forEach(() => this.handleNewNoteComponent());
		this.Form.patchValue(datasource);
	}
	get noteComponents(): FormArray {
		return this.Form.get('noteComponents') as FormArray;
	}
	get clientTypeId(): FormControl {
		return this.Form.get('clientTypeId') as FormControl;
	}
	changeClientType(data: any) {
		this.getAllClientsByType(data.value);
	}
	getAllClientsByType(id: number) {
		this.subscriptions.push(
			this._client.getAllByType(id).subscribe({
				next: (data) => {
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
					this.ClientTypesDataSource = data;
				},
				error: (e) => {
					this.toastr.error(e.message, 'لايمكن تحميل ابيانات ');
				},
			})
		);
	}
	getAllServices() {
		this.subscriptions.push(
			this._service.getAll().subscribe({
				next: (data) => {
					this.ServicesDataSource = data;
				},
				error: (e) => {
					this.toastr.error(e.message, 'لايمكن تحميل ابيانات ');
				},
			})
		);
	}
	getSingle = (id: number) =>
		this.subscriptions.push(
			this._note.getOne(id).subscribe((data: any) => {
				this.fillFormWithData(data);
			})
		);
	getTerms = () => this.subscriptions.push(this._note.getTerms().subscribe((data) => (this.TermsDataSource = data)));
	getSTages = () => this.subscriptions.push(this._note.getStages().subscribe((data) => (this.StagesDataSource = data)));
	back = () => this.router.navigate([this.controllerName]);
	handleNewNoteComponent = () => {
		console.log('handle');
		this.noteComponents.push(this.createFormItem('noteComponent'));
	};
	handleDeleteNoteComponent = (index: number) => this.noteComponents.removeAt(index);
	handleSubmit() {
		if (this.Form.valid) {
			console.log(this.Form.value);
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
