import { Injectable } from '@angular/core';
import { BaseHttpClient } from '../../../shared/classes/base-http-client.abstract';
import { ResponseDto } from '../../../shared/interfaces/response.dto';
import { BACKEND_APIs } from '../apis/backend-apis';
import { Supplier } from '../models/supplier/ISupplier';

@Injectable({
  providedIn: 'root',
})
export class SupplierService extends BaseHttpClient {
  getAll = () => this.httpClient.get<ResponseDto>(`${BACKEND_APIs.supplier}`, { headers: this.headers });

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
  add = (model: Supplier) => this.httpClient.post<ResponseDto>(BACKEND_APIs.supplier, model, { headers: this.headers });

  update = (id: number, model: Supplier) => this.httpClient.put<ResponseDto>(BACKEND_APIs.supplier, { ...model, id }, { headers: this.headers });
}
