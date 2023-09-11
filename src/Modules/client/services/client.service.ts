import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Client} from '../interFaces/Iclient';
import {ToastrService} from 'ngx-toastr';
import {GenericService} from 'src/Modules/shared/services/genericCRUD.service';
import { ResponseDto } from './../../shared/interfaces/Iresponse';
import { TeacherProfit } from '../interFaces/IteacherProfit';

@Injectable({
  providedIn: 'root',
})
export class ClientService extends GenericService<Client> {
  constructor(http: HttpClient, toastrService: ToastrService) {
    super(http, 'Client', toastrService);
  }

  getAllByType = (id: number) => this.http.get<ResponseDto>(`${this.uri}/getByClientTypeId?id=${id}`);

  getTeacherProfit() {
    this.loadingData.next(true);
    this.http.get<ResponseDto>(`${this.uri}/GetTeacherProfit`).subscribe({
      next: (data: ResponseDto) => {
        this.dataChange.next(data);
      },
      error: (e) => {
        this.loadingData.next(false);
        let res: ResponseDto = e.error ?? e;
        this._toastrService.error(res.message);
      },
      complete: () => this.loadingData.next(false),
    });
  }

  addTeacherEarning = (model: TeacherProfit) => this.http.post<ResponseDto>(`${this.uri}/AddTeacheEarning`, model);

  deleteTeacherEarning = (id: number) => this.http.get<ResponseDto>(`${this.uri}/DeleteTeacheEarning?id=${id}`);
}
