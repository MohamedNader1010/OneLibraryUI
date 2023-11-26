import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ServiceType } from '../models/serviceType.model';
import { ToastrService } from 'ngx-toastr';
import { GenericService } from 'src/app/shared/services/genericCRUD.service';
import { ResponseDto } from '../../../../shared/interfaces/IResponse.dto';

@Injectable({
  providedIn: 'root',
})
export class ServicesTypeService extends GenericService<ServiceType> {
  constructor(http: HttpClient, toastrService: ToastrService) {
    super(http, 'ServiceType', toastrService);
  }
}
