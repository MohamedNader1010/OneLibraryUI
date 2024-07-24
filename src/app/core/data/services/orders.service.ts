import { Injectable } from '@angular/core';
import { HttpParams } from '@angular/common/http';
import { OrderDetailStatus } from '../../../shared/enums/OrderDetailStatus.enum';
import { ResponseDto } from '../../../shared/interfaces/IResponse.dto';
import { PagingCriteria } from '../../../shared/interfaces/pagingCriteria';
import { Order } from '../models/order/Iorder';
import { OrderTransaction } from '../models/order/IorderTransaction';
import { ReservedOrderDetail } from '../models/order/IReservedOrderDetail.interface';
import { BACKEND_APIs } from '../apis/backend-apis';
import { BaseHttpClient } from '../../../shared/classes/base-http-client.abstract';
import { map, tap, finalize } from 'rxjs';
import { IPaginatedResponse } from '../../../shared/interfaces/paginationResponse.interface';
import { IGenericResponseDto } from '../../../shared/interfaces/IGenericResponse.dto';

@Injectable({
  providedIn: 'root',
})
export class OrderService extends BaseHttpClient {
  getPagedData(pagingCriteria: PagingCriteria) {
    this.loadingData.next(true);
    const params = new HttpParams({
      fromObject: {
        direction: pagingCriteria.direction,
        pageSize: pagingCriteria.pageSize,
        filter: pagingCriteria.filter,
        orderBy: pagingCriteria.orderBy,
        pageIndex: pagingCriteria.pageIndex,
      },
    });
    return this.httpClient.get<IGenericResponseDto<IPaginatedResponse<Order>>>(BACKEND_APIs.order, { headers: this.headers, params }).pipe(
      map((data) => {
        return {
          status: data.status,
          message: data.message,
          body: data.body.results,
          totalCount: data.body.totalCount,
        };
      }),
      tap((data: ResponseDto) => {
        this.dataChange.next(data);
      }),
      finalize(() => this.loadingData.next(false)),
    );
  }

  GetById = (id: number) => this.httpClient.get<ResponseDto>(BACKEND_APIs.orderById(id), { headers: this.headers });

  add = (model: Order) => this.httpClient.post<ResponseDto>(BACKEND_APIs.order, model, { headers: this.headers });

  getOrdersByStatus(status: OrderDetailStatus) {
    this.loadingData.next(true);
    this.httpClient.get<ResponseDto>(`${BACKEND_APIs.orderStatus}?status=${status}`).subscribe({
      next: (data: ResponseDto) => {
        this.dataChange.next(data);
      },
      error: () => this.loadingData.next(false),
      complete: () => this.loadingData.next(false),
    });
  }

  GetReservedOrderDetails() {
    this.httpClient.get<ResponseDto>(BACKEND_APIs.orderDetailsReserved).subscribe({
      next: (data: ResponseDto) => {
        this.loadingData.next(true);
        this.dataChange.next(data);
      },
      error: () => this.loadingData.next(false),
      complete: () => this.loadingData.next(false),
    });
  }

  addOrderTransaction = (order: OrderTransaction) => this.httpClient.post<ResponseDto>(BACKEND_APIs.orderTransaction, order);

  updateOrderDetailsStatus = (order: Order) => this.httpClient.put<ResponseDto>(BACKEND_APIs.orderDetailsStatus, order);

  MarkSingleOrderDetailAsReady = (orderDetail: ReservedOrderDetail) => this.httpClient.put<ResponseDto>(BACKEND_APIs.orderDetailsReadySingle, orderDetail);

  getAllUnfinishedOrders = (pagingCriteria: PagingCriteria) => {
    const params = new HttpParams({
      fromObject: {
        direction: pagingCriteria.direction,
        pageSize: pagingCriteria.pageSize,
        filter: pagingCriteria.filter,
        orderBy: pagingCriteria.orderBy,
        pageIndex: pagingCriteria.pageIndex,
      },
    });

    return this.httpClient.get<IGenericResponseDto<IPaginatedResponse<Order>>>(BACKEND_APIs.orderUnFinished, { headers: this.headers, params }).pipe(
      map((data) => {
        return {
          status: data.status,
          message: data.message,
          body: data.body.results,
          totalCount: data.body.totalCount,
        };
      }),
    );
  };
}
