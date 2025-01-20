import { Injectable } from '@angular/core';
import { ResponseDto } from '../../../shared/interfaces/response.dto';
import { CloseAndStartShift } from '../models/shift/IcloseAndStartShift';
import { BaseHttpClient } from '../../../shared/classes/base-http-client.abstract';
import { BACKEND_APIs } from '../apis/backend-apis';
import { Shift } from '../models/shift/IShift';

@Injectable({
  providedIn: 'root',
})
export class ShiftService extends BaseHttpClient {
  getAll = () => this.httpClient.get<ResponseDto>(BACKEND_APIs.shift, { headers: this.headers });

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

  add = (model: Shift) => this.httpClient.post<ResponseDto>(BACKEND_APIs.shift, model, { headers: this.headers });

  update = (id: number, model: Shift) => this.httpClient.put<ResponseDto>(BACKEND_APIs.shift, { ...model, id }, { headers: this.headers });

  start = (model: CloseAndStartShift) => this.httpClient.post<ResponseDto>(BACKEND_APIs.shiftStart, model, { headers: this.headers });

  GetCurrentShift = () => this.httpClient.get<ResponseDto>(BACKEND_APIs.shiftCurrent, { headers: this.headers });

  GetShiftDetails = (id: number) => this.httpClient.get<ResponseDto>(BACKEND_APIs.shiftDetailsById(id), { headers: this.headers });
}

//todo: backend handle pagination with filter and sort

//todo: test the application

//todo: test fiscal year

//todo: clean table component

//todo: add unit of work pattern
