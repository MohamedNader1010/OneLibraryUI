import { Injectable } from '@angular/core';
import { ResponseDto } from '../../../shared/interfaces/response.dto';
import { BaseHttpClient } from '../../../shared/classes/base-http-client.abstract';
import { BACKEND_APIs } from '../apis/backend-apis';
import { map, tap, finalize } from 'rxjs';
import { IPagingCriteria } from '../interfaces/paging-criteria.interface';
import { Material } from '../models/material/Imaterial';

@Injectable({
  providedIn: 'root',
})
export class MaterialService extends BaseHttpClient {
  getPagedData(pagingCriteria: IPagingCriteria = this._pagingCriteria) {
    this.loadingData.next(true);
    const params = this.convertToHttpParams(pagingCriteria);
    return this.httpClient.get<ResponseDto>(BACKEND_APIs.material, { headers: this.headers, params }).pipe(
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

  add = (model: Material) => this.httpClient.post<ResponseDto>(BACKEND_APIs.material, model, { headers: this.headers });

  update = (id: number, model: Material) => this.httpClient.put<ResponseDto>(BACKEND_APIs.material, { ...model, id }, { headers: this.headers });

  getAllOverview = () => this.httpClient.get<ResponseDto>(BACKEND_APIs.materialOverview, { headers: this.headers });
}
