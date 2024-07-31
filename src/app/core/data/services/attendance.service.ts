import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { ResponseDto } from '../../../shared/interfaces/response.dto';
import { BaseHttpClient } from '../../../shared/classes/base-http-client.abstract';
import { BACKEND_APIs } from '../apis/backend-apis';
import { Attendance } from '../models/attendance/attendance';

@Injectable({
  providedIn: 'root',
})
export class AttendanceService extends BaseHttpClient {
  checkedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  getAll = () => this.httpClient.get<ResponseDto>(`${BACKEND_APIs.attendance}`, { headers: this.headers });

  getAllDataForTable() {
    this.loadingData.next(true);
    this.getAll().subscribe({
      next: (data: ResponseDto) => {
        this.dataChange.next(data);
      },
      error: () => this.loadingData.next(false),
      complete: () => this.loadingData.next(false),
    });
  }

  AttendanceState = (id: string) => this.httpClient.get<ResponseDto>(BACKEND_APIs.getAttendanceStateById(id), { headers: this.headers });

  add = (model: Attendance) => this.httpClient.post<ResponseDto>(BACKEND_APIs.attendance, model, { headers: this.headers });

  update = (id: number, model: Attendance) => this.httpClient.put<ResponseDto>(BACKEND_APIs.attendance, { ...model, id }, { headers: this.headers });

  checkIn = () => this.httpClient.post<ResponseDto>(BACKEND_APIs.attendanceCheckIn, { headers: this.headers });

  checkOut = () => this.httpClient.post<ResponseDto>(BACKEND_APIs.attendanceCheckOut, { headers: this.headers });
}
