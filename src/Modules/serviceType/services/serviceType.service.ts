import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {ServiceType} from "../interFaces/IserviceType";
import {SharedService} from "./../../shared/services/shared.service";

@Injectable({
	providedIn: "root",
})
export class ServicesTypeService {
	constructor(private http: HttpClient, private data: SharedService) {}
	uri: string = `${this.data.apiUrl}ServiceType/`;
	getAll = () => this.http.get<ServiceType[]>(`${this.uri}GetServiceTypes`);
	getOne = (id: number) => this.http.get<ServiceType>(`${this.data.apiUrl}GetServiceTypesById/GetById/${id}`);
	add(serviceType: ServiceType) {
		const httpOptions = {headers: new HttpHeaders({"Content-Type": "application/json"})};
		return this.http.post<ServiceType>(`${this.uri}AddServiceType`, serviceType, httpOptions);
	}
	update(id: number, serviceType: ServiceType) {
		const httpOptions = {headers: new HttpHeaders({"Content-Type": "application/json"})};
		return this.http.put<ServiceType>(`${this.uri}EditServiceType/${id}`, {...serviceType, id}, httpOptions);
	}
	delete(id: number) {
		const httpOptions = {headers: new HttpHeaders({"Content-Type": "application/json"})};
		return this.http.delete<ServiceType>(`${this.uri}DeleteServiceType?id=${id}`, httpOptions);
	}
}
