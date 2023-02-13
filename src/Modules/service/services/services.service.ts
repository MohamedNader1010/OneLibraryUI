import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {_HttpOptions} from 'src/Persistents/consts';
import {Service} from '../interfaces/Iservice';

@Injectable({
	providedIn: 'root',
})
export class ServicesService {
	constructor(private http: HttpClient) {}
	uri: string = `${environment.apiUrl}`;
	getAll = () => this.http.get<Service[]>(`${this.uri}Service`);
	add = (service: Service) => this.http.post<Service>(`${this.uri}Service`, service);
	getOne = (id: number) => this.http.get<Service[]>(`${this.uri}Service?Id=${id}`);
	update = (id: number, service: Service) => this.http.put<Service>(`${this.uri}Service?Id=${id}`, {...service, id});
	delete = (id: number) => this.http.delete<Service>(`${this.uri}Service?Id=${id}`);
	getPrice = (serviceId: number, clientTypeId: number) => this.http.get(`${this.uri}ServicePricePerClientType/GetServicePricePerClientType?ClientTypeId=${clientTypeId}&ServiceId=${serviceId}`);
}
