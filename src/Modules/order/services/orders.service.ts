import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Order} from "../interfaces/Iorder";
import {_HttpOptions} from "src/Persistents/consts";
import {environment} from "src/environments/environment";

@Injectable({
	providedIn: "root",
})
export class OrderService {
	constructor(private http: HttpClient) {}
	uri: string = `${environment.apiUrl}Order/`;
	getAll = () => this.http.get<Order[]>(`${this.uri}`);
	getOne = (id: number) => this.http.get<Order>(`${this.uri}GetOrderById?Id=${id}`);
	add = (order: Order) => this.http.post<Order>(`${this.uri}AddOrder`, order, _HttpOptions);
	// update order api =>
	update = (id: number, order: Order) => this.http.put<Order>(`${this.uri}?Id=${id}`, {...order, id}, _HttpOptions);
	// delete order api =>
	delete = (id: number) => this.http.delete<Order>(`${this.uri}?Id=${id}`, _HttpOptions);
	// remaining apis =>
	// add order transaction, get order by client id , get order within date interval
}
