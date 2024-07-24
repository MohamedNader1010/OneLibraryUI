import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject } from 'rxjs';
import { ResponseDto } from '../interfaces/IResponse.dto';

export abstract class BaseHttpClient {
  httpClient = inject(HttpClient);

  toastrService = inject(ToastrService);

  loadingData: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  get isLoading(): boolean {
    return this.loadingData.value;
  }

  _emptyResponse: ResponseDto = {
    body: [],
    message: '',
    status: true,
    totalCount: 0,
  };

  dataChange: BehaviorSubject<ResponseDto> = new BehaviorSubject<ResponseDto>(this._emptyResponse);

  get data(): ResponseDto {
    return this.dataChange.value ?? this._emptyResponse;
  }
}
