import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { GenericService } from 'src/app/shared/services/genericCRUD.service';
import { IncomeOutcome } from '../models/income-outcome.model';

@Injectable({
  providedIn: 'root',
})
export class IncomesOutcomesService extends GenericService<IncomeOutcome> {
  constructor(http: HttpClient, toastrService: ToastrService) {
    super(http, 'IncomeOutcome', toastrService);
  }
}
