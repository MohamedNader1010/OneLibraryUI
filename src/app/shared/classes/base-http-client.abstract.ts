import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { ResponseDto } from '../interfaces/response.dto';
import { IPagingCriteria } from '../../core/data/interfaces/paging-criteria.interface';

export abstract class BaseHttpClient {
  httpClient = inject(HttpClient);

  toastrService = inject(ToastrService);

  loadingData: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  get isLoading(): boolean {
    return this.loadingData.value;
  }

  set isLoading(value: boolean) {
    this.loadingData.next(value);
  }

  _emptyResponse: ResponseDto = {
    body: [],
    message: '',
    status: true,
    totalCount: 0,
  };

  _pagingCriteria: IPagingCriteria = {
    direction: 'desc',
    orderBy: 'Id',
    pageIndex: 0,
    pageSize: 25,
    filters: {},
  };

  dataChange: BehaviorSubject<ResponseDto> = new BehaviorSubject<ResponseDto>(this._emptyResponse);

  get data(): ResponseDto {
    return this.dataChange.value ?? this._emptyResponse;
  }

  convertToHttpParams(pagingCriteria: IPagingCriteria): HttpParams {
    const { filters = [], ...rest } = pagingCriteria;
    let params = new HttpParams({ fromObject: rest });
    Object.entries(filters).forEach(([key, value], index) => {
      params = params.append(`Filters[${index}].key`, key).append(`Filters[${index}].value`, value);
    });
    return params;
  }
}
