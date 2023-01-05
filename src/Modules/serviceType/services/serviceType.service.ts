import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {environment} from "src/environments/environment";
import {_HttpOptions} from "src/Persistents/consts";
import {ServiceType} from "../interFaces/IserviceType";

@Injectable({
	providedIn: "root",
})
export class ServicesTypeService {
	constructor(private http: HttpClient) {}
	uri: string = `${environment.apiUrl}ServiceType/`;
	getAll = () => this.http.get<ServiceType[]>(`${this.uri}GetServiceTypes`);
	getOne = (id: number) => this.http.get<ServiceType>(`${this.uri}GetServiceTypesById/GetById/${id}`);
	add = (serviceType: ServiceType) => this.http.post<ServiceType>(`${this.uri}AddServiceType`, serviceType, _HttpOptions);
	update = (id: number, serviceType: ServiceType) => this.http.put<ServiceType>(`${this.uri}EditServiceType/${id}`, {...serviceType, id}, _HttpOptions);
	delete = (id: number) => this.http.delete<ServiceType>(`${this.uri}DeleteServiceType?id=${id}`, _HttpOptions);
}
