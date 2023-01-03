import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Material} from "../interfaces/Imaterial";
import {SharedService} from "./../../shared/services/shared.service";

@Injectable({
	providedIn: "root",
})
export class MaterialService {
	constructor(private http: HttpClient, private data: SharedService) {}
	uri: string = `${this.data.apiUrl}Material/`;
	getAll = () => this.http.get<Material[]>(`${this.uri}GetMaterial`);
	getOne = (id: number) => this.http.get<Material>(`${this.data.apiUrl}GetMaterialsById/GetById/${id}`);
	add(material: Material) {
		const httpOptions = {headers: new HttpHeaders({"Content-Type": "application/json"})};
		return this.http.post<Material>(`${this.uri}AddMaterial`, material, httpOptions);
	}
	update(id: number, material: Material) {
		const httpOptions = {headers: new HttpHeaders({"Content-Type": "application/json"})};
		return this.http.put<Material>(`${this.uri}EditMaterial/${id}`, {...material, id}, httpOptions);
	}
	delete(id: number) {
		const httpOptions = {headers: new HttpHeaders({"Content-Type": "application/json"})};
		return this.http.delete<Material>(`${this.uri}DeleteMaterial?id=${id}`, httpOptions);
	}
}
