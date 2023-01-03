import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Service} from "../interfaces/Iservice";
import {SharedService} from "./../../shared/services/shared.service";

@Injectable({
	providedIn: "root",
})
export class ServicesService {
	constructor(private http: HttpClient, private data: SharedService) {}
	uri: string = `${this.data.apiUrl}Service/`;
	getAll = () => this.http.get<Service[]>(`${this.uri}GetServices`);
	getOne = (id: number) => this.http.get<Service>(`${this.data.apiUrl}GetServicesById/GetById/${id}`);
	add(service: Service) {
		const httpOptions = {headers: new HttpHeaders({"Content-Type": "application/json"})};
		return this.http.post<Service>(`${this.uri}AddService`, service, httpOptions);
	}
	update(id: number, service: Service) {
		const httpOptions = {headers: new HttpHeaders({"Content-Type": "application/json"})};
		return this.http.put<Service>(`${this.uri}EditService/${id}`, {...service, id}, httpOptions);
	}
	delete(id: number) {
		const httpOptions = {headers: new HttpHeaders({"Content-Type": "application/json"})};
		return this.http.delete<Service>(`${this.uri}DeleteService?id=${id}`, httpOptions);
	}
}
