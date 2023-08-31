import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import { GenericService } from 'src/Modules/shared/services/genericCRUD.service';
import { IncomeOutcome } from '../interfaces/Iincome-outcome';

@Injectable({
  providedIn: 'root',
})
export class IncomesOutcomesService extends GenericService<IncomeOutcome> {
  constructor(http: HttpClient, toastrService: ToastrService) {
    super(http, 'IncomeOutcome', toastrService);
  }
}
