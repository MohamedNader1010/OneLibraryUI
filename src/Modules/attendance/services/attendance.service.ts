import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { GenericService } from 'src/Modules/shared/services/genericCRUD.service';
import { Attendance } from '../interfaces/attendance';
import { ResponseDto } from '../../shared/interfaces/IResponse.dto';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class AttendanceService extends GenericService<Attendance> {
  override controller = 'Attendance';
  override uri: string = `${environment.apiUrl}${this.controller}`;

  checkedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  getEmpAttendance = (id: string, from: Date, to: Date) =>
    this.httpClient.get<ResponseDto>(`${this.uri}/GetEmpAttendance/${id}`, { headers: this.headers, params: { from: from.toDateString(), to: to.toDateString() } });

  getByDate = (from: Date, to: Date) => this.httpClient.get<ResponseDto>(`${this.uri}/GetByDate`, { headers: this.headers, params: { from: from.toDateString(), to: to.toDateString() } });

  checkIn = () => this.httpClient.post<ResponseDto>(`${this.uri}/CheckIn`, { headers: this.headers });

  checkOut = () => this.httpClient.post<ResponseDto>(`${this.uri}/CheckOut`, { headers: this.headers });
  AttendanceState = (id: string) => this.httpClient.get<ResponseDto>(`${this.uri}/AttendanceState/${id}`, { headers: this.headers });
}
