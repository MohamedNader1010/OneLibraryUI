import {HttpClient, HttpHeaders} from "@angular/common/http";
import {Injectable} from "@angular/core";
import {Material} from "../interfaces/Imaterial";
import {SharedService} from "./../../shared/services/shared.service";
import {_HttpOptions} from "./../../../Persistents/consts";
import {environment} from "src/environments/environment";

@Injectable({
	providedIn: "root",
})
export class MaterialService {
	constructor(private http: HttpClient, private data: SharedService) {}
	uri: string = `${environment.apiUrl}Material/`;

	getAll = () => this.http.get<Material[]>(`${this.uri}GetMaterial`);
	getOne = (id: number) => this.http.get<Material>(`${this.uri}GetMaterialsById/GetById/${id}`);
	add = (material: Material) => this.http.post<Material>(`${this.uri}AddMaterial`, material, _HttpOptions);
	update = (id: number, material: Material) => this.http.put<Material>(`${this.uri}EditMaterial/${id}`, {...material, id}, _HttpOptions);
	delete = (id: number) => this.http.delete<Material>(`${this.uri}DeleteMaterial?id=${id}`, _HttpOptions);
}
