import { OrderTransaction } from './../interfaces/IorderTransaction';
import { Injectable } from '@angular/core';
import { Order } from '../interfaces/Iorder';
import { OrderDetailStatus } from '../../shared/enums/OrderDetailStatus.enum';
import { GenericService } from 'src/Modules/shared/services/genericCRUD.service';
import { ResponseDto } from '../../shared/interfaces/IResponse.dto';
import { OrderDetail } from './../interfaces/IorderDetail';
import { PagingCriteria } from 'src/Modules/shared/interfaces/pagingCriteria';
import { ReservedOrderDetail } from '../interfaces/IReservedOrderDetail.interface';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class OrderService extends GenericService<Order> {
  override controller = 'Order';
  override uri: string = `${environment.apiUrl}${this.controller}`;

  getOrdersByStatus(status: OrderDetailStatus) {
    this.loadingData.next(true);
    this.httpClient.get<ResponseDto>(`${this.uri}/GetByStatus?status=${status}`).subscribe({
      next: (data: ResponseDto) => {
        this.dataChange.next(data);
      },
      error: () => this.loadingData.next(false),
      complete: () => this.loadingData.next(false),
    });
  }

  GetReservedOrderDetails() {
    this.httpClient.get<ResponseDto>(`${this.uri}/GetReservedOrderDetails`).subscribe({
      next: (data: ResponseDto) => {
        this.loadingData.next(true);
        this.dataChange.next(data);
      },
      error: () => this.loadingData.next(false),
      complete: () => this.loadingData.next(false),
    });
  }

  addOrderTransaction = (order: OrderTransaction) => this.httpClient.post<ResponseDto>(`${this.uri}/AddOrderTransaction`, order);

  getOrderDetails = (id: number) => this.httpClient.get<ResponseDto>(`${this.uri}/GetOrderDetails?Id=${id}`);

  updateOrderDetailsStatus = (order: Order) => this.httpClient.put<ResponseDto>(`${this.uri}/UpdateOrderDetailsStatus`, order);

  updateOrderDetailStatus = (orderDetail: OrderDetail) => this.httpClient.put<ResponseDto>(`${this.uri}/UpdateOrderDetailStatus`, orderDetail);

  markOrderDetailsAsReady = (orderDetails: ReservedOrderDetail[]) => this.httpClient.put<ResponseDto>(`${this.uri}/MarkOrderDetailsAsReady`, orderDetails);

  MarkSingleOrderDetailAsReady = (orderDetail: ReservedOrderDetail) => this.httpClient.put<ResponseDto>(`${this.uri}/MarkSingleOrderDetailAsReady`, orderDetail);
  getAllUnfinishedOrders = (pagingCriteria: PagingCriteria) => this.httpClient.post<ResponseDto>(`${this.uri}/GetAllUnFinishedPaginated`, pagingCriteria);
}
