import { Injectable } from '@angular/core';
import { Client } from '../interFaces/Iclient';
import { GenericService } from 'src/Modules/shared/services/genericCRUD.service';
import { ResponseDto } from '../../shared/interfaces/IResponse.dto';
import { TeacherProfit } from '../interFaces/IteacherProfit';
import { IBulkPayment } from '../interFaces/IbulkPayment';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClientService extends GenericService<Client> {
  override controller = 'Client';
  override uri: string = `${environment.apiUrl}${this.controller}`;

  getAllByType = (id: number, filter: string) => this.httpClient.get<ResponseDto>(`${this.uri}/getByClientTypeId?id=${id}`, { params: { queryFilter: filter } });

  getTeacherProfit() {
    this.loadingData.next(true);
    this.httpClient.get<ResponseDto>(`${this.uri}/GetTeacherProfit`).subscribe({
      next: (data: ResponseDto) => {
        this.dataChange.next(data);
      },
      error: (e) => this.loadingData.next(false),
      complete: () => this.loadingData.next(false),
    });
  }

  addTeacherEarning = (model: TeacherProfit) => this.httpClient.post<ResponseDto>(`${this.uri}/AddTeacheEarning`, model);

  deleteTeacherEarning = (id: number) => this.httpClient.get<ResponseDto>(`${this.uri}/DeleteTeacheEarning?id=${id}`);

  bulkPayment = (model: IBulkPayment) => this.httpClient.post<ResponseDto>(`${this.uri}/PayBulk`, model);
}
