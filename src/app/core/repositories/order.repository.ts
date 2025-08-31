import { Injectable } from '@angular/core';
import { BaseApiRepository } from './common/base-api.repository';
import { BACKEND_APIs } from '../apis/backend-apis';
import { IPagedResponse } from '../Common/models/response/paged-response.interface';
import { IOrderOverViewDTO } from '../models/Orders/dtos/order-overview-dto.interface';
import { IApiResponseT } from '../Common/models/response/api-response-t.interface';
import { IGetOrderByIdQuery } from '../models/Orders/queries/get-order-by-id-query.interface';
import { IOrderDTO } from '../models/Orders/dtos/order-dto.interface';
import { IGetOrderDetailsByStatusQuery } from '../models/Orders/queries/get-order-details-by-status-query.interface';
import { IOrderDetailDTO } from '../models/Orders/dtos/order-detail-dto.interface';
import { ICreateOrderCommand } from '../models/Orders/commands/create-order-command.interface';
import { ICreateOrderPaymentCommand } from '../models/Orders/commands/create-order-payment-command.interface';
import { IUpdateOrderCommand } from '../models/Orders/commands/update-order-command.interface';
import { Observable } from 'rxjs';
import { IPrintReceiptCommand } from '../models/Orders/commands/print-receipt-command.interface';
import { IGetAllOrdersOverviewQuery } from './../models/Orders/queries/get-all-orders-overview-query.interface';
import { IGetAllUnfinishedOrdersOverviewQuery } from './../models/Orders/queries/get-all-unfinished-orders-overview-query.interface';

@Injectable({ providedIn: 'root' })
export class OrderRepository extends BaseApiRepository {
    getAllPaginated = (query: IGetAllOrdersOverviewQuery): Observable<IPagedResponse<IOrderOverViewDTO>> =>
        this.getPaginated<IPagedResponse<IOrderOverViewDTO>>(BACKEND_APIs.orders.root, query);

    getAllUnFinishedPaginated = (query: IGetAllUnfinishedOrdersOverviewQuery): Observable<IPagedResponse<IOrderOverViewDTO>> =>
        this.getPaginated<IPagedResponse<IOrderOverViewDTO>>(BACKEND_APIs.orders.unfinished(), query);

    getAllUnFinishedOrdersStatus = (): Observable<IApiResponseT<boolean>> =>
        this.get<IApiResponseT<boolean>>(BACKEND_APIs.orders.checkUnFinished());

    getById = (query: IGetOrderByIdQuery): Observable<IApiResponseT<IOrderDTO>> =>
        this.get<IApiResponseT<IOrderDTO>>(BACKEND_APIs.orders.byId(query.id));

    getByStatus = (query: IGetOrderDetailsByStatusQuery): Observable<IApiResponseT<IOrderDetailDTO[]>> =>
        this.getPaginated<IPagedResponse<IOrderDetailDTO>>(BACKEND_APIs.orders.status(query.status), query);

    add = (command: ICreateOrderCommand): Observable<IApiResponseT<any>> =>
        this.post<IApiResponseT<any>>(BACKEND_APIs.orders.root, command);

    addPayment = (command: ICreateOrderPaymentCommand): Observable<IApiResponseT<any>> =>
        this.post<IApiResponseT<any>>(BACKEND_APIs.orders.payment(), command);

    edit = (command: IUpdateOrderCommand): Observable<IApiResponseT<any>> =>
        this.put<IApiResponseT<any>>(BACKEND_APIs.orders.root, command);

    printReceipt = (command: IPrintReceiptCommand): Observable<IApiResponseT<any>> =>
        this.post<IApiResponseT<any>>(BACKEND_APIs.orders.printById(command.orderId), command);
}
