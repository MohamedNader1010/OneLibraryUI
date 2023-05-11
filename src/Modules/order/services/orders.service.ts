import {OrderTransaction} from './../interfaces/IorderTransaction';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Order} from '../interfaces/Iorder';
import {Status} from '../Enums/status';
import {ToastrService} from 'ngx-toastr';
import {GenericService} from 'src/Modules/shared/services/genericCRUD.service';
import {Response} from './../../shared/interfaces/Iresponse';

@Injectable({
	providedIn: 'root',
})
export class OrderService extends GenericService<Order> {
	constructor(http: HttpClient, private toastr: ToastrService) {
		super(http, 'Order');
	}

	getAllOrders() {
		this.http.get<Response>(this.uri).subscribe({
			next: (data: Response) => {
				this.loadingData.next(true);
				this.dataChange.next(data.body);
			},
			error: (e) => {
				this.loadingData.next(false);
				let res: Response = e.error ?? e;
				this.toastr.error(res.message);
			},
			complete: () => this.loadingData.next(false),
		});
	}
	getOrdersByStatus(status: Status) {
		this.http.get<Response>(`${this.uri}/GetByStatus?status=${status}`).subscribe({
			next: (data: Response) => {
				this.loadingData.next(true);
				this.dataChange.next(data.body);
			},
			error: (e) => {
				this.loadingData.next(false);
				let res: Response = e.error ?? e;
				this.toastr.error(res.message);
			},
			complete: () => this.loadingData.next(false),
		});
	}
	// remaining apis =>
	// add order transaction, get order by client id , get order within date interval
	addOrderTransaction = (order: OrderTransaction) => this.http.post<Response>(`${this.uri}/AddOrderTransaction`, order);
	getOrderDetails = (id: number) => this.http.get<Response>(`${this.uri}/GetOrderDetails?Id=${id}`);
	updateStatus = (order: Order) => this.http.put<Response>(`${this.uri}/UpdateStatus`, order);
}
