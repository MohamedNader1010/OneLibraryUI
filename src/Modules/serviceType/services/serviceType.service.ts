import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {environment} from 'src/environments/environment';
import {ServiceType} from '../interFaces/IserviceType';

@Injectable({
	providedIn: 'root',
})
export class ServicesTypeService {
	constructor(private http: HttpClient) {}
	uri: string = `${environment.apiUrl}ServiceType/`;
	getAll = () => this.http.get<ServiceType[]>(`${this.uri}`);
	add = (serviceType: ServiceType) => this.http.post<ServiceType>(`${this.uri}`, serviceType);
	update = (id: number, serviceType: ServiceType) => this.http.put<ServiceType>(`${this.uri}?id=${id}`, {...serviceType, id});
	getOne = (id: number) => this.http.get<ServiceType[]>(`${this.uri}GetServicetTypeById?id=${id}`);
	delete = (id: number) => this.http.delete<ServiceType>(`${this.uri}?id=${id}`);
}
