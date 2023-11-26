import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Service } from '../models/service.model';
import { ToastrService } from 'ngx-toastr';
import { GenericService } from 'src/app/shared/services/genericCRUD.service';
import { ResponseDto } from '../../../../shared/interfaces/IResponse.dto';

@Injectable({
  providedIn: 'root',
})
export class ServicesService extends GenericService<Service> {
  constructor(http: HttpClient, toastrService: ToastrService) {
    super(http, 'Service', toastrService);
  }

  deleteServiceMaterials = (ids: number[]) => this.http.delete<ResponseDto>(`${this.uri}DeleteServiceMaterials`, { body: ids });
}
