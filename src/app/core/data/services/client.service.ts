import { Injectable } from '@angular/core';
import { ResponseDto } from '../../../shared/interfaces/response.dto';
import { IBulkPayment } from '../models/client/IbulkPayment';
import { TeacherProfit } from '../models/client/IteacherProfit';
import { BaseHttpClient } from '../../../shared/classes/base-http-client.abstract';
import { BACKEND_APIs } from '../apis/backend-apis';
import { Client } from '../models/client/Iclient';
import { IPagingCriteria } from '../interfaces/paging-criteria.interface';
import { HttpParams } from '@angular/common/http';
import { map, tap, finalize } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class ClientService extends BaseHttpClient {
  getPagedData(pagingCriteria: IPagingCriteria) {
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
    return this.httpClient.get<ResponseDto>(BACKEND_APIs.client, { headers: this.headers, params }).pipe(
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

  getAllByType = (id: number, filter: string) => this.httpClient.get<ResponseDto>(`${BACKEND_APIs.clientByClientType}?id=${id}`, { params: { queryFilter: filter } });

  getTeacherProfit() {
    this.loadingData.next(true);
    this.httpClient.get<ResponseDto>(BACKEND_APIs.clientTeacherProfit).subscribe({
      next: (data: ResponseDto) => {
        this.dataChange.next(data);
      },
      error: (e) => this.loadingData.next(false),
      complete: () => this.loadingData.next(false),
    });
  }

  add = (model: Client) => this.httpClient.post<ResponseDto>(BACKEND_APIs.client, model, { headers: this.headers });

  update = (id: number, model: Client) => this.httpClient.put<ResponseDto>(BACKEND_APIs.client, { ...model, id }, { headers: this.headers });

  addTeacherEarning = (model: TeacherProfit) => this.httpClient.post<ResponseDto>(BACKEND_APIs.clientTeacherEarning, model);

  bulkPayment = (model: IBulkPayment) => this.httpClient.post<ResponseDto>(BACKEND_APIs.clientPayBulk, model);
}
