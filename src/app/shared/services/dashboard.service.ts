import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ResponseDto } from '../interfaces/IResponse.dto';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  constructor(private _http: HttpClient) {}

  getDashboardData() {
    const uri: string = `${environment.apiUrl}Dashboard`;
    return this._http.get<ResponseDto>(uri);
  }
}
