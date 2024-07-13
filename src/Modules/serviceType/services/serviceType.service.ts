import { Injectable } from '@angular/core';
import { ServiceType } from '../interFaces/IserviceType';
import { GenericService } from 'src/Modules/shared/services/genericCRUD.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ServicesTypeService extends GenericService<ServiceType> {
  override controller = 'ServiceType';
  override uri: string = `${environment.apiUrl}${this.controller}`;
}
