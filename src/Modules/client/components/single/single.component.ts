import {Component, OnInit, OnDestroy} from '@angular/core';
import {MatDialog} from '@angular/material/dialog';
import {ActivatedRoute} from '@angular/router';
import {Subscription} from 'rxjs';
import {Client} from '../../interFaces/Iclient';
import {ClientService} from './../../services/client.service';
@Component({
	selector: 'app-single',
	templateUrl: './single.component.html',
	styleUrls: ['./single.component.css'],
})
export class SingleComponent implements OnInit, OnDestroy {
	subscriptions: Subscription[] = [];
	loading!: boolean;
	id!: number;
	client!: Client;

	constructor(private route: ActivatedRoute, private _client: ClientService, public dialog: MatDialog) {}
	ngOnInit(): void {
		this.subscriptions.push(this.route.queryParams.subscribe((params) => (this.id = params['id'])));
		if (this.id) this.getSingle();
	}

	getSingle() {
		this.loading = true;
		this.subscriptions.push(
			this._client.getOne(this.id).subscribe({
				next: (data: Client) => {
					this.client = data;
				},
				complete: () => (this.loading = false),
			})
		);
	}
	ngOnDestroy() {
		this.subscriptions.forEach((s) => s.unsubscribe());
	}
}
