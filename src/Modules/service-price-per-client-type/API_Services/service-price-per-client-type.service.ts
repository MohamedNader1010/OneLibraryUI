import {environment} from 'src/environments/environment';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ServicePricePerClientType} from '../Interfaces/ServicePricePerClientType';

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

	update = (id: number, model: ServicePricePerClientType) => this._http.put<ServicePricePerClientType>(`${this.uri}?Id=${id}`, {...model, id});
	getPrice = (clientTypeId: number, serviceId: number) => this._http.get(`${this.uri}GetServicePricePerClientType?ClientTypeId=${clientTypeId}&ServiceId=${serviceId}`);
}
