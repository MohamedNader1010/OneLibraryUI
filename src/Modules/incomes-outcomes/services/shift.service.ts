import { Shift } from './../interfaces/Ishift';
import { Injectable } from '@angular/core';
import { GenericService } from 'src/Modules/shared/services/genericCRUD.service';
import { ResponseDto } from '../../shared/interfaces/IResponse.dto';

import { CloseAndStartShift } from '../interfaces/IcloseAndStartShift';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ShiftService extends GenericService<Shift> {
  override controller = 'Shift';
  override uri: string = `${environment.apiUrl}${this.controller}`;

  closeAndStartNewShift = (model: CloseAndStartShift) => this.httpClient.post<ResponseDto>(`${this.uri}/EndShiftStartNewOne`, model, { headers: this.headers });

  GetCurrentShift = () => this.httpClient.get<ResponseDto>(`${this.uri}/CurrentShift`, { headers: this.headers });

  GetLastGuarante = () => this.httpClient.get<ResponseDto>(`${this.uri}/LastGuarante`, { headers: this.headers });

  GetShiftDetails = (id: number) => this.httpClient.get<ResponseDto>(`${this.uri}/GetShiftDetails/${id}`, { headers: this.headers });
}
