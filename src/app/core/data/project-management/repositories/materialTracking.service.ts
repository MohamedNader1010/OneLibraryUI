import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { GenericService } from 'src/app/shared/services/genericCRUD.service';
import { MaterialTracking } from '../models/materialTracking.model';

@Injectable({
  providedIn: 'root',
})
export class MaterialTrackingService extends GenericService<MaterialTracking> {
  constructor(http: HttpClient, toastrService: ToastrService) {
    super(http, 'MaterialIncomeOutcome', toastrService);
  }
}
