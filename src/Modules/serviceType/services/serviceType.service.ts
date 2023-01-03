import {HttpClient} from "@angular/common/http";
import {Injectable} from "@angular/core";
import { environment } from "src/environments/environment";
import { _HttpOptions } from "src/Persistents/consts";
import {ServiceType} from "../interFaces/IserviceType";
import {SharedService} from "./../../shared/services/shared.service";

@Injectable({
	providedIn: "root",
})
export class ServicesTypeService {
	constructor(private http: HttpClient, private data: SharedService) {}
	
	uri: string = `${environment.apiUrl}ServiceType/`;
	
	getAll = () => this.http.get<ServiceType[]>(`${this.uri}GetServiceTypes`);
	
	getOne = (id: number) => this.http.get<ServiceType>(`${this.uri}GetServiceTypesById/GetById/${id}`);
	
	add(serviceType: ServiceType) {
		_HttpOptions
		return this.http.post<ServiceType>(`${this.uri}AddServiceType`, serviceType, _HttpOptions);
	}
	
	update(id: number, serviceType: ServiceType) {
		_HttpOptions
		return this.http.put<ServiceType>(`${this.uri}EditServiceType/${id}`, {...serviceType, id}, _HttpOptions);
	}
	
	delete(id: number) {
		_HttpOptions
		return this.http.delete<ServiceType>(`${this.uri}DeleteServiceType?id=${id}`, _HttpOptions);
	}
}
