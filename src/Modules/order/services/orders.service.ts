import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Order} from "../interfaces/Iorder";
import {SharedService} from "../../shared/services/shared.service";
import {_HttpOptions} from "src/Persistents/consts";
import {environment} from "src/environments/environment";

@Injectable({
	providedIn: "root",
})
export class OrderService {
	constructor(private http: HttpClient, private data: SharedService) {}
	uri: string = `${environment.apiUrl}Order/`;
	getAll = () => this.http.get<Order[]>(`${this.uri}GetOrders`);
	getOne = (id: number) => this.http.get<Order>(`${this.uri}GetOrderById/GetById/${id}`);
	add = (order: Order) => this.http.post<Order>(`${this.uri}AddOrder`, order, _HttpOptions);
	update = (id: number, order: Order) => this.http.put<Order>(`${this.uri}EditOrder/${id}`, {...order, id}, _HttpOptions);
	delete = (id: number) => this.http.delete<Order>(`${this.uri}DeleteOrder?id=${id}`, _HttpOptions);
}
