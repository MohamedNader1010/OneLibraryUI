import { Injectable } from '@angular/core';
import { Service } from '../interfaces/Iservice';
import { GenericService } from 'src/Modules/shared/services/genericCRUD.service';
import { ResponseDto } from '../../shared/interfaces/IResponse.dto';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class ServicesService extends GenericService<Service> {
  override controller = 'Service';
  override uri: string = `${environment.apiUrl}${this.controller}`;

  deleteServiceMaterials = (ids: number[]) => this.httpClient.delete<ResponseDto>(`${this.uri}DeleteServiceMaterials`, { body: ids });
}
