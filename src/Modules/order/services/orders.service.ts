import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Order} from "../interfaces/Iorder";
import {SharedService} from "../../shared/services/shared.service";

@Injectable({
	providedIn: "root",
})
export class OrderService {
	constructor(private http: HttpClient, private data: SharedService) {}
	uri: string = `${this.data.apiUrl}Order/`;
	getAll = () => this.http.get<Order[]>(`${this.uri}GetOrders`);
	getOne = (id: number) => this.http.get<Order>(`${this.data.apiUrl}GetOrderById/GetById/${id}`);
	add(order: Order) {
		const httpOptions = {headers: new HttpHeaders({"Content-Type": "application/json"})};
		return this.http.post<Order>(`${this.uri}AddOrder`, order, httpOptions);
	}
	update(id: number, order: Order) {
		const httpOptions = {headers: new HttpHeaders({"Content-Type": "application/json"})};
		return this.http.put<Order>(`${this.uri}EditOrder/${id}`, {...order, id}, httpOptions);
	}
	delete(id: number) {
		const httpOptions = {headers: new HttpHeaders({"Content-Type": "application/json"})};
		return this.http.delete<Order>(`${this.uri}DeleteOrder?id=${id}`, httpOptions);
	}
}
