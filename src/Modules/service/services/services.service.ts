import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Service} from '../interfaces/Iservice';
import { ToastrService } from 'ngx-toastr';
import { GenericService } from 'src/Modules/shared/services/genericCRUD.service';
import { Response } from './../../shared/interfaces/Iresponse';

@Injectable({
  providedIn: 'root',
})
export class ServicesService extends GenericService<Service> {
  constructor(http: HttpClient, toastrService: ToastrService) {
    super(http, 'Service', toastrService);
  }

  deleteServiceMaterials = (ids: number[]) => this.http.delete<Response>(`${this.uri}DeleteServiceMaterials`, { body: ids });
}
