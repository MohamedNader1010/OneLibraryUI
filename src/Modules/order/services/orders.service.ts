import { OrderTransaction } from './../interfaces/IorderTransaction';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../interfaces/Iorder';
import { Status } from '../Enums/status';
import { ToastrService } from 'ngx-toastr';
import { GenericService } from 'src/Modules/shared/services/genericCRUD.service';
import { Response } from './../../shared/interfaces/Iresponse';
import { OrderDetail } from './../interfaces/IorderDetail';
import { PagingCriteria } from 'src/Modules/shared/interfaces/pagingCriteria';
import { Observable, catchError, finalize, tap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class OrderService extends GenericService<Order> {
  constructor(http: HttpClient, override _toastrService: ToastrService) {
    super(http, 'Order', _toastrService);
  }
  getPagedOrders(pagingCriteria: PagingCriteria): Observable<any> {
    this.loadingData.next(true);
    return this.http.post<Response>(`${this.uri}/GetAllOrders`, pagingCriteria).pipe(
      tap((data: Response) => {
        this.dataChange.next(data);
      }),
      catchError((e) => {
        this.loadingData.next(false);
        let res: Response = e.error ?? e;
        this._toastrService.error(res.message);
        return [];
      }),
      finalize(() => this.loadingData.next(false)),
    );
  }
  getOrdersByStatus(status: Status) {
    this.loadingData.next(true);
    this.http.get<Response>(`${this.uri}/GetByStatus?status=${status}`).subscribe({
      next: (data: Response) => {
        this.dataChange.next(data);
      },
      error: (e) => {
        this.loadingData.next(false);
        let res: Response = e.error ?? e;
        this._toastrService.error(res.message);
      },
      complete: () => this.loadingData.next(false),
    });
  }

  GetReservedOrderDetails() {
    this.http.get<Response>(`${this.uri}/GetReservedOrderDetails`).subscribe({
      next: (data: Response) => {
        this.loadingData.next(true);
        this.dataChange.next(data);
      },
      error: (e) => {
        this.loadingData.next(false);
        let res: Response = e.error ?? e;
        this._toastrService.error(res.message);
      },
      complete: () => this.loadingData.next(false),
    });
  }

  // remaining apis =>
  // add order transaction, get order by client id , get order within date interval
  addOrderTransaction = (order: OrderTransaction) => this.http.post<Response>(`${this.uri}/AddOrderTransaction`, order);
  getOrderDetails = (id: number) => this.http.get<Response>(`${this.uri}/GetOrderDetails?Id=${id}`);
  updateOrderDetailStatus = (orderDetail: OrderDetail) => this.http.put<Response>(`${this.uri}/UpdateOrderDetailStatus`, orderDetail);
  updateOrderDetailsStatus = (order: Order) => this.http.put<Response>(`${this.uri}/UpdateOrderDetailsStatus`, order);
  markOrderDetailsAsReady = (orderDetails: OrderDetail[]) => this.http.put<Response>(`${this.uri}/MarkOrderDetailsAsReady`, orderDetails);
}
