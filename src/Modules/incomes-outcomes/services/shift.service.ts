import { Shift } from './../interfaces/Ishift';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {GenericService} from 'src/Modules/shared/services/genericCRUD.service';
import {Response} from './../../shared/interfaces/Iresponse';
import {ToastrService} from 'ngx-toastr';

import { CloseAndStartShift } from "../interfaces/IcloseAndStartShift"

@Injectable({
  providedIn: 'root',
})
export class ShiftService extends GenericService<Shift> {
  constructor(http: HttpClient, toastrService: ToastrService) {
    super(http, 'Shift', toastrService);
  }

  closeAndStartNewShift = (model: CloseAndStartShift) => this.http.post<Response>(`${this.uri}/EndShiftStartNewOne`, model, { headers: this.headers });

  GetCurrentShift = () => this.http.get<Response>(`${this.uri}/CurrentShift`, { headers: this.headers });

  GetLastGuarante = () => this.http.get<Response>(`${this.uri}/LastGuarante`, { headers: this.headers });

  GetShiftDetails = (id: number) => this.http.get<Response>(`${this.uri}/GetShiftDetails/${id}`, { headers: this.headers });
}
