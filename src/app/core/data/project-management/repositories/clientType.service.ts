import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ClientType } from '../models/clientType.model';
import { ToastrService } from 'ngx-toastr';
import { GenericService } from 'src/app/shared/services/genericCRUD.service';
import { ResponseDto } from '../../../../shared/interfaces/IResponse.dto';

@Injectable({
  providedIn: 'root',
})
export class ClientTypeService extends GenericService<ClientType> {
  constructor(http: HttpClient, toastrService: ToastrService) {
    super(http, 'ClientType', toastrService);
  }
}
