import { Injectable } from '@angular/core';
import { ServicePricePerClientType } from '../Interfaces/ServicePricePerClientType';
import { GenericService } from 'src/Modules/shared/services/genericCRUD.service';
import { ResponseDto } from 'src/Modules/shared/interfaces/IResponse.dto';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ServicePricePerClientTypeService extends GenericService<ServicePricePerClientType> {
  override controller = 'ServicePricePerClientType';
  override uri: string = `${environment.apiUrl}${this.controller}`;

  GetAllPriced = (clientTypeId: number) => this.httpClient.get<ResponseDto>(`${this.uri}/GetAllPriced`, { params: { clientTypeId } });

  GetAllPricedWithOriginalPrices = (clientTypeId: number) => this.httpClient.get<ResponseDto>(`${this.uri}/GetAllPricedWithOriginalPrices`, { params: { clientTypeId } });

  getPrice = (clientTypeId: number, serviceId: number) => this.httpClient.get<ResponseDto>(`${this.uri}/GetServicePricePerClientType?ClientTypeId=${clientTypeId}&ServiceId=${serviceId}`);
}
