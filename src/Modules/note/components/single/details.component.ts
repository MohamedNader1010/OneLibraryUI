import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {Note} from '../../interfaces/Inote';
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
	constructor(private _note: NoteService, private router: Router, private route: ActivatedRoute, public dialog: MatDialog, private fb: FormBuilder) {}
	ngOnInit(): void {
		this.subscriptions.push(this.route.queryParams.subscribe((params) => (this.id = params['id'])));
		if (this.id) this.getSingle(this.id);
	}
	getSingle = (id: number) => this.subscriptions.push(this._note.getOne(id).subscribe((data) => (this.noteDetails = data)));
	back = () => this.router.navigate([this.controllerName]);
	ngOnDestroy() {
		this.subscriptions.forEach((s) => s.unsubscribe());
	}
}
