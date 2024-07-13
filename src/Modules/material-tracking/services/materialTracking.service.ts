import { Injectable } from '@angular/core';
import { GenericService } from 'src/Modules/shared/services/genericCRUD.service';
import { MaterialTracking } from '../interfaces/materialTracking';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MaterialTrackingService extends GenericService<MaterialTracking> {
  override controller = 'MaterialTransaction';
  override uri: string = `${environment.apiUrl}${this.controller}`;
}
