import { Injectable } from '@angular/core';
import { ResponseDto } from '../../../shared/interfaces/response.dto';
import { BaseHttpClient } from '../../../shared/classes/base-http-client.abstract';
import { BACKEND_APIs } from '../apis/backend-apis';
import { HttpParams } from '@angular/common/http';
import { map, tap, finalize } from 'rxjs';
import { IPagingCriteria } from '../interfaces/paging-criteria.interface';
import { Service } from '../models/service/Iservice';

@Injectable({
  providedIn: 'root',
})
export class ServicesService extends BaseHttpClient {
  getAllOverview = () => this.httpClient.get<ResponseDto>(BACKEND_APIs.serviceOverview, { headers: this.headers });

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
    return this.httpClient.get<ResponseDto>(BACKEND_APIs.service, { headers: this.headers, params }).pipe(
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

  add = (model: Service) => this.httpClient.post<ResponseDto>(BACKEND_APIs.service, model, { headers: this.headers });

  update = (id: number, model: Service) => this.httpClient.put<ResponseDto>(BACKEND_APIs.service, { ...model, id }, { headers: this.headers });
}
