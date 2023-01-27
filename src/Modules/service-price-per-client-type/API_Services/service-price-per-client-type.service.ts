import { Service } from "./../../service/interfaces/Iservice";
import { environment } from "src/environments/environment";
import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ServicesService } from "src/Modules/service/services/services.service";
import { ServicePricePerClientType } from "../Interfaces/ServicePricePerClientType";

@Injectable({
  providedIn: "root",
})
export class ServicePricePerClientTypeService {
  uri: string = `${environment.apiUrl}ServicePricePerClientType/`;

  constructor(private _http: HttpClient, private services: ServicesService) {}

  getAll = () =>
    this._http.get<ServicePricePerClientTypeService[]>(`${this.uri}`);

  delete = (id: number) =>
    this._http.delete<ServicePricePerClientTypeService>(`${this.uri}?Id=${id}`);

  update = (id: number, order: ServicePricePerClientType) =>
    this._http.put<ServicePricePerClientType>(`${this.uri}?Id=${id}`, { ...order, id });
}
