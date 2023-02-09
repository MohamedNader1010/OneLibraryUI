import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {Note} from '../../interfaces/Inote';
import {NoteComponent} from '../../interfaces/noteComponent';
import {NoteService} from '../../services/note.service';
@Component({
	selector: 'app-details',
	templateUrl: './details.component.html',
	styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit, OnDestroy {
	subscriptions: Subscription[] = [];
	id!: number;
	controllerName: string = 'notes';
	noteDetails!: Note;
	noteComponents: NoteComponent[] = [];
	constructor(private _note: NoteService, private router: Router, private route: ActivatedRoute, public dialog: MatDialog, private fb: FormBuilder) {}
	ngOnInit(): void {
		this.subscriptions.push(
			this.route.queryParams.subscribe((params) => {
				this.id = params['id'];
				if (this.id) {
					this.getSingle(this.id);
					// this.getNoteComponents(this.id);
				}
			})
		);
	}
	getSingle = (id: number) =>
		this.subscriptions.push(
			this._note.getOne(id).subscribe((data: any) => {
				this.noteDetails = {
					id: data.id,
					name: data.name,
					actualPrice: data.actualPrice,
					teacherPrice: data.teacherPrice,
					finalPrice: data.finalPrice,
					clientId: data.clientId,
					client: data.client.name,
					termId: data.termId,
					term: data.term.name,
					stageId: data.stageId,
					stage: data.stage.name,
					originalPrice: data.originalPrice,
					earning: data.earning,
					// noteComponents: (): any[] => {
					// 	data.noteComponents.forEach((el: any) => {
					// 		let notecomp: NoteComponent = {
					// 			serviceId: el.serviceId,
					// 			id: el.id,
					// 			service: el.service.name,
					// 			quantity: el.quantity,
					// 			noteId: el.noteId,
					// 		};
					// 		this.noteComponents.push(notecomp);
					// 	});
					// 	return this.noteComponents;
					// },
				};
			})
		);
	// getNoteComponents = (id: number) => this.subscriptions.push(this._note.getNoteCompnents(id).subscribe((data: any) => (this.noteComponents = data)));
	back = () => this.router.navigate([this.controllerName]);
	ngOnDestroy() {
		this.subscriptions.forEach((s) => s.unsubscribe());
	}
}
