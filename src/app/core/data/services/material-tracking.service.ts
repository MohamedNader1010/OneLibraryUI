import { Injectable } from '@angular/core';
import { BaseHttpClient } from '../../../shared/classes/base-http-client.abstract';
import { BACKEND_APIs } from '../apis/backend-apis';
import { HttpParams } from '@angular/common/http';
import { map, tap, finalize } from 'rxjs';
import { ResponseDto } from '../../../shared/interfaces/IResponse.dto';
import { PagingCriteria } from '../../../shared/interfaces/pagingCriteria';
import { MaterialTracking } from '../models/material-transaction/materialTracking';

@Injectable({
  providedIn: 'root',
})
export class MaterialTrackingService extends BaseHttpClient {
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
    return this.httpClient.get<ResponseDto>(BACKEND_APIs.materialTransaction, { headers: this.headers, params }).pipe(
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

  add = (model: MaterialTracking) => this.httpClient.post<ResponseDto>(BACKEND_APIs.materialTransaction, model, { headers: this.headers });

  update = (id: number, model: MaterialTracking) => this.httpClient.put<ResponseDto>(BACKEND_APIs.materialTransaction, { ...model, id }, { headers: this.headers });
}
