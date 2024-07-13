import { Injectable } from '@angular/core';
import { Supplier } from '../interfaces/ISupplier';
import { GenericService } from '../../shared/services/genericCRUD.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class SupplierService extends GenericService<Supplier> {
  override controller = 'Supplier';
  override uri: string = `${environment.apiUrl}${this.controller}`;
}
