import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { ResponseDto } from '../interfaces/IResponse.dto';

@Injectable({
  providedIn: 'root'
})
export class FiscalYearsService {

  constructor(private _http: HttpClient) {}

  getAllFiscalYears() {
    const uri: string = `${environment.apiUrl}FiscalYear`;
    return this._http.get<ResponseDto>(uri);
  }
}
