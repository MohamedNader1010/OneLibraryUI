import { OrderTransaction } from '../models/orderTransaction.model';
import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Order } from '../models/order.model';
import { OrderDetailStatus } from '../../../../shared/enums/OrderDetailStatus.enum';
import { ToastrService } from 'ngx-toastr';
import { GenericService } from 'src/app/shared/services/genericCRUD.service';
import { ResponseDto } from '../../../../shared/interfaces/IResponse.dto';
import { OrderDetail } from '../models/orderDetail.model';
import { PagingCriteria } from 'src/app/shared/interfaces/pagingCriteria';
import { Observable, catchError, finalize, tap } from 'rxjs';
import { ReservedOrderDetail } from '../models/ReservedOrderDetail.model';

@Injectable({
  providedIn: 'root',
})
export class OrderService extends GenericService<Order> {
  constructor(http: HttpClient, override _toastrService: ToastrService) {
    super(http, 'Order', _toastrService);
  }

  getOrdersByStatus(status: OrderDetailStatus) {
    this.loadingData.next(true);
    this.http.get<ResponseDto>(`${this.uri}/GetByStatus?status=${status}`).subscribe({
      next: (data: ResponseDto) => {
        this.dataChange.next(data);
      },
      error: () => this.loadingData.next(false),
      complete: () => this.loadingData.next(false),
    });
  }

  GetReservedOrderDetails() {
    this.http.get<ResponseDto>(`${this.uri}/GetReservedOrderDetails`).subscribe({
      next: (data: ResponseDto) => {
        this.loadingData.next(true);
        this.dataChange.next(data);
      },
      error: () => this.loadingData.next(false),
      complete: () => this.loadingData.next(false),
    });
  }

  addOrderTransaction = (order: OrderTransaction) => this.http.post<ResponseDto>(`${this.uri}/AddOrderTransaction`, order);

  getOrderDetails = (id: number) => this.http.get<ResponseDto>(`${this.uri}/GetOrderDetails?Id=${id}`);

  updateOrderDetailsStatus = (order: Order) => this.http.put<ResponseDto>(`${this.uri}/UpdateOrderDetailsStatus`, order);

  updateOrderDetailStatus = (orderDetail: OrderDetail) => this.http.put<ResponseDto>(`${this.uri}/UpdateOrderDetailStatus`, orderDetail);

  markOrderDetailsAsReady = (orderDetails: ReservedOrderDetail[]) => this.http.put<ResponseDto>(`${this.uri}/MarkOrderDetailsAsReady`, orderDetails);

  MarkSingleOrderDetailAsReady = (orderDetail: ReservedOrderDetail) => this.http.put<ResponseDto>(`${this.uri}/MarkSingleOrderDetailAsReady`, orderDetail);
}
