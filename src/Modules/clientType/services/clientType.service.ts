import { Injectable } from '@angular/core';
import { ClientType } from '../interFaces/IclientType';
import { GenericService } from 'src/Modules/shared/services/genericCRUD.service';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ClientTypeService extends GenericService<ClientType> {
  override controller = 'ClientType';
  override uri: string = `${environment.apiUrl}${this.controller}`;
}
