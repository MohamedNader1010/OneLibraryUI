import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Material} from '../interfaces/Imaterial';
import {GenericService} from 'src/Modules/shared/services/genericCRUD.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root',
})
export class MaterialService extends GenericService<Material> {
  constructor(http: HttpClient, toastrService: ToastrService) {
    super(http, 'Material', toastrService);
  }
}
