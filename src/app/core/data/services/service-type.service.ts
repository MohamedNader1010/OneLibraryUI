import { Injectable } from '@angular/core';
import { BaseHttpClient } from '../../../shared/classes/base-http-client.abstract';
import { ResponseDto } from '../../../shared/interfaces/response.dto';
import { BACKEND_APIs } from '../apis/backend-apis';
import { ServiceType } from '../models/service-type/IserviceType';

@Injectable({
  providedIn: 'root',
})
export class ServicesTypeService extends BaseHttpClient {
  getAll = () => this.httpClient.get<ResponseDto>(`${BACKEND_APIs.serviceType}`, { headers: this.headers });

  getAllDataForTable() {
    this.loadingData.next(true);
    this.getAll().subscribe({
      next: (data: ResponseDto) => {
        this.dataChange.next(data);
      },
      error: () => this.loadingData.next(false),
      complete: () => this.loadingData.next(false),
    });
  }
  add = (model: ServiceType) => this.httpClient.post<ResponseDto>(BACKEND_APIs.serviceType, model, { headers: this.headers });

  update = (id: number, model: ServiceType) => this.httpClient.put<ResponseDto>(BACKEND_APIs.serviceType, { ...model, id }, { headers: this.headers });
}
