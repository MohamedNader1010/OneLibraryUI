import { Injectable } from '@angular/core';
import { ResponseDto } from '../../../shared/interfaces/response.dto';
import { BaseHttpClient } from '../../../shared/classes/base-http-client.abstract';
import { BACKEND_APIs } from '../apis/backend-apis';
import { ServicePricePerClientType } from '../models/service-price-per-client-type/ServicePricePerClientType';

@Injectable({
  providedIn: 'root',
})
export class ServicePricePerClientTypeService extends BaseHttpClient {
  getAll = () => this.httpClient.get<ResponseDto>(BACKEND_APIs.servicePricePerClientType, { headers: this.headers });

  //todo: need fixes pagination
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

  add = (model: ServicePricePerClientType) => this.httpClient.post<ResponseDto>(BACKEND_APIs.servicePricePerClientType, model, { headers: this.headers });

  update = (id: number, model: ServicePricePerClientType) => this.httpClient.put<ResponseDto>(BACKEND_APIs.servicePricePerClientType, { ...model, id }, { headers: this.headers });

  GetAllPriced = (clientTypeId: number) => this.httpClient.get<ResponseDto>(BACKEND_APIs.PricedServices, { params: { clientTypeId } });

  GetAllPricedWithOriginalPrices = (clientTypeId: number) => this.httpClient.get<ResponseDto>(BACKEND_APIs.PricedServicesByClientTypeIdWithOriginalPrices(clientTypeId), { params: { clientTypeId } });
}
