import { Injectable } from '@angular/core';
import { BaseHttpClient } from '../../../shared/classes/base-http-client.abstract';
import { ResponseDto } from '../../../shared/interfaces/response.dto';
import { BACKEND_APIs } from '../apis/backend-apis';
import { Employee } from '../models/employee/IEmployee';

@Injectable({
  providedIn: 'root',
})
export class EmployeeService extends BaseHttpClient {
  getAll = () => this.httpClient.get<ResponseDto>(`${BACKEND_APIs.employee}`, { headers: this.headers });

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

  add = (model: Employee) => this.httpClient.post<ResponseDto>(BACKEND_APIs.employee, model, { headers: this.headers });

  update = (id: string, model: Employee) => this.httpClient.put<ResponseDto>(BACKEND_APIs.employee, { ...model, id }, { headers: this.headers });
}
