import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Client } from '../models/client.model';
import { ToastrService } from 'ngx-toastr';
import { GenericService } from 'src/app/shared/services/genericCRUD.service';
import { ResponseDto } from '../../../../shared/interfaces/IResponse.dto';
import { TeacherProfit } from '../models/teacherProfit.model';

@Injectable({
  providedIn: 'root',
})
export class ClientService extends GenericService<Client> {
  constructor(http: HttpClient, toastrService: ToastrService) {
    super(http, 'Client', toastrService);
  }

  getAllByType = (id: number, filter: string) => this.http.get<ResponseDto>(`${this.uri}/getByClientTypeId?id=${id}`, { params: { queryFilter: filter } });

  getTeacherProfit() {
    this.loadingData.next(true);
    this.http.get<ResponseDto>(`${this.uri}/GetTeacherProfit`).subscribe({
      next: (data: ResponseDto) => {
        this.dataChange.next(data);
      },
      error: (e) => this.loadingData.next(false),
      complete: () => this.loadingData.next(false),
    });
  }

  addTeacherEarning = (model: TeacherProfit) => this.http.post<ResponseDto>(`${this.uri}/AddTeacheEarning`, model);

  deleteTeacherEarning = (id: number) => this.http.get<ResponseDto>(`${this.uri}/DeleteTeacheEarning?id=${id}`);
}
