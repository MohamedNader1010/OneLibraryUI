import { Shift } from './../interfaces/Ishift';
import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {GenericService} from 'src/Modules/shared/services/genericCRUD.service';
import { ResponseDto } from '../../shared/interfaces/IResponse.dto';
import { ToastrService } from 'ngx-toastr';

import { CloseAndStartShift } from '../interfaces/IcloseAndStartShift';

@Injectable({
  providedIn: 'root',
})
export class ShiftService extends GenericService<Shift> {
  constructor(http: HttpClient, toastrService: ToastrService) {
    super(http, 'Shift', toastrService);
  }

  closeAndStartNewShift = (model: CloseAndStartShift) => this.http.post<ResponseDto>(`${this.uri}/EndShiftStartNewOne`, model, { headers: this.headers });

  GetCurrentShift = () => this.http.get<ResponseDto>(`${this.uri}/CurrentShift`, { headers: this.headers });

  GetLastGuarante = () => this.http.get<ResponseDto>(`${this.uri}/LastGuarante`, { headers: this.headers });

  GetShiftDetails = (id: number) => this.http.get<ResponseDto>(`${this.uri}/GetShiftDetails/${id}`, { headers: this.headers });
}
