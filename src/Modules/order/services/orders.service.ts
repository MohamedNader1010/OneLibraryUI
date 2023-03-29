import { OrderDetail } from "./../interfaces/IorderDetail";
import { OrderTransaction } from "./../interfaces/IorderTransaction";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Order } from "../interfaces/Iorder";
import { environment } from "src/environments/environment";
import { Status } from "../Enums/status";

@Injectable({
  providedIn: "root",
})
export class OrderService {
  constructor(private http: HttpClient) { }
  uri: string = `${environment.apiUrl}Order/`;
  getAll = () => this.http.get<Order[]>(`${this.uri}`);
  getOne = (id: number) =>
    this.http.get<Order>(`${this.uri}GetOrderById?Id=${id}`);
  add = (order: Order) => this.http.post<Order>(`${this.uri}AddOrder`, order);
  // update order api =>
  update = (id: number, order: Order) =>
    this.http.put<Order>(`${this.uri}?Id=${id}`, { ...order, id });
  // delete order api =>
  delete = (id: number) => this.http.delete<Order>(`${this.uri}?Id=${id}`);
  // remaining apis =>
  // add order transaction, get order by client id , get order within date interval
  addOrderTransaction = (order: OrderTransaction) =>
    this.http.post<OrderTransaction>(`${this.uri}AddOrderTransaction`, order);
  getOrderDetails = (id: number) =>
    this.http.get<OrderDetail[]>(`${this.uri}GetOrderDetails?Id=${id}`);
  getOrdersByStatus = (status: Status) =>
    this.http.get<OrderDetail[]>(`${this.uri}GetByStatus?status=${status}`);
  updateStatus = (order: Order) =>
    this.http.put(`${this.uri}UpdateStatus`, order);
}
