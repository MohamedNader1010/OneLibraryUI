import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ServicePricePerClientType} from '../Interfaces/ServicePricePerClientType';
import {ToastrService} from 'ngx-toastr';
import {GenericService} from 'src/Modules/shared/services/genericCRUD.service';
import { ResponseDto } from 'src/Modules/shared/interfaces/IResponse.dto';

@Injectable({
  providedIn: 'root',
})
export class ServicePricePerClientTypeService extends GenericService<ServicePricePerClientType> {
  constructor(http: HttpClient, toastrService: ToastrService) {
    super(http, 'ServicePricePerClientType', toastrService);
  }

  GetAllPriced = (clientTypeId: number) => this.http.get<ResponseDto>(`${this.uri}/GetAllPriced`, { params: { clientTypeId } });

  GetAllPricedWithOriginalPrices = (clientTypeId: number) => this.http.get<ResponseDto>(`${this.uri}/GetAllPricedWithOriginalPrices`, { params: { clientTypeId } });

  getPrice = (clientTypeId: number, serviceId: number) => this.http.get<ResponseDto>(`${this.uri}/GetServicePricePerClientType?ClientTypeId=${clientTypeId}&ServiceId=${serviceId}`);

  // deleteServicePrices = (ids: number[]) => this.http.delete<ResponseDto>(`${this.uri}DeleteServicePrices`, { body: ids });
}
