
import { ServicePrice } from "./../Interfaces/ServicePricePerClientType";
import { Service } from "./../../service/interfaces/Iservice";
import { environment } from "src/environments/environment";
import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ServicesService } from "src/Modules/service/services/services.service";
import { ServicePricePerClientType } from "../Interfaces/ServicePricePerClientType";


@Injectable({
	providedIn: 'root',
})
export class ServicePricePerClientTypeService {
	uri: string = `${environment.apiUrl}ServicePricePerClientType/`;

	constructor(private _http: HttpClient) {}
	add = (model: ServicePricePerClientType) => this._http.post(`${this.uri}`, model);
	getOne = (id: number) => this._http.get<ServicePricePerClientType[]>(`${this.uri}GetById?id=${id}`);

	getAll = () => this._http.get<ServicePricePerClientTypeService[]>(`${this.uri}`);

	delete = (id: number) => this._http.delete<ServicePricePerClientTypeService>(`${this.uri}?Id=${id}`);

  update = (id: number, order: ServicePricePerClientType) =>
    this._http.put<ServicePricePerClientType>(`${this.uri}?Id=${id}`, {
      ...order,
      id,
    });

  getServicePricePerClient = (clientTypeId: number, serviceId: number) => {
    let params = new HttpParams()
      .set("clientTypeId", clientTypeId)
      .set("serviceId", serviceId);
    return this._http.get<ServicePrice>(`${this.uri}GetServicePricePerClientType`, { params: params })
    
  };

	getPrice = (clientTypeId: number, serviceId: number) => this._http.get(`${this.uri}GetServicePricePerClientType?ClientTypeId=${clientTypeId}&ServiceId=${serviceId}`);

}
