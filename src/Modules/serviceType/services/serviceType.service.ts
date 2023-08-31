import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ServiceType} from '../interFaces/IserviceType';
import {ToastrService} from 'ngx-toastr';
import {GenericService} from 'src/Modules/shared/services/genericCRUD.service';
import {Response} from './../../shared/interfaces/Iresponse';

@Injectable({
  providedIn: 'root',
})
export class ServicesTypeService extends GenericService<ServiceType> {
  constructor(http: HttpClient, toastrService: ToastrService) {
    super(http, 'ServiceType', toastrService);
  }
}
