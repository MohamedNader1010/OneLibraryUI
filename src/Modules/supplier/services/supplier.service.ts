import { Injectable } from '@angular/core';
import { Supplier } from '../interfaces/ISupplier';
import { ToastrService } from 'ngx-toastr';
import { GenericService } from '../../shared/services/genericCRUD.service';
import { Response } from '../../shared/interfaces/Iresponse';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class SupplierService extends GenericService<Supplier> {
  constructor(http: HttpClient, private toastr: ToastrService) {
    super(http, 'Supplier');
  }
  getAllSuppliers() {
    this.loadingData.next(true);
    this.http.get<Response>(this.uri).subscribe({
      next: (data: Response) => {
        this.dataChange.next(data);
      },
      error: (e) => {
        this.loadingData.next(false);
        let res: Response = e.error ?? e;
        this.toastr.error(res.message);
      },
      complete: () => this.loadingData.next(false),
    });
  }
}
