import {Component, Inject, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder} from '@angular/forms';
import {MatDialog, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ActivatedRoute, Router} from '@angular/router';
import {Subscription} from 'rxjs';
import {Order} from '../../interfaces/Iorder';
import {OrderService} from '../../services/orders.service';
@Component({
	selector: 'app-details',
	templateUrl: './details.component.html',
	styleUrls: ['./details.component.css'],
})
export class DetailsComponent implements OnInit, OnDestroy {
	subscriptions: Subscription[] = [];
	id!: number;
	orderDetails!: Order;
	constructor(@Inject(MAT_DIALOG_DATA) public data: any, private _order: OrderService, private router: Router, private route: ActivatedRoute, public dialog: MatDialog, private fb: FormBuilder) {}
	ngOnInit(): void {
		this.subscriptions.push(
			this.route.queryParams.subscribe((params) => {
				this.id = params['id'];
				if (this.id) this.getSingle(this.id);
			})
		);
	}
	getSingle = (id: number) => this.subscriptions.push(this._order.getOne(id).subscribe((data) => (this.orderDetails = data)));
	ngOnDestroy() {
		this.subscriptions.forEach((s) => s.unsubscribe());
	}
}
