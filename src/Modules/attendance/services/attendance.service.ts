import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {BehaviorSubject} from 'rxjs';
import {GenericService} from 'src/Modules/shared/services/genericCRUD.service';
import {Attendance} from '../interfaces/attendance';
import { ResponseDto } from './../../shared/interfaces/Iresponse';

@Injectable({
  providedIn: 'root',
})
export class AttendanceService extends GenericService<Attendance> {
  constructor(http: HttpClient, toastrService: ToastrService) {
    super(http, 'Attendance', toastrService);
  }

  checkedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  getEmpAttendance = (id: string, from: Date, to: Date) =>
    this.http.get<ResponseDto>(`${this.uri}/GetEmpAttendance/${id}`, { headers: this.headers, params: { from: from.toDateString(), to: to.toDateString() } });

  getByDate = (from: Date, to: Date) => this.http.get<ResponseDto>(`${this.uri}/GetByDate`, { headers: this.headers, params: { from: from.toDateString(), to: to.toDateString() } });

  checkIn = () => this.http.post<ResponseDto>(`${this.uri}/CheckIn`, { headers: this.headers });

  checkOut = () => this.http.post<ResponseDto>(`${this.uri}/CheckOut`, { headers: this.headers });
  AttendanceState = (id: string) => this.http.get<ResponseDto>(`${this.uri}/AttendanceState/${id}`, { headers: this.headers });
}
