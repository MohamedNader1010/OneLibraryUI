import { Injectable } from '@angular/core';
import { Supplier } from '../interfaces/ISupplier';
import { ToastrService } from 'ngx-toastr';
import { GenericService } from '../../shared/services/genericCRUD.service';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SupplierService extends GenericService<Supplier> {
  constructor(http: HttpClient, toastrService: ToastrService) {
    super(http, 'Supplier', toastrService);
  }
}
