import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { ToastrService } from "ngx-toastr";
import { environment } from "src/environments/environment";
import { Response } from "../interfaces/Iresponse";

@Injectable({
  providedIn: "root",
})
export class DashboardService {
  constructor(private _http: HttpClient, private _toastr: ToastrService) {}

  getDashboardData() {
    const uri: string = `${environment.apiUrl}Dashboard`;
    return this._http.get<Response>(uri);
  }
}
