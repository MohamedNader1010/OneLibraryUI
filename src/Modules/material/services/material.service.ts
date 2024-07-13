import { Injectable } from '@angular/core';
import { Material } from '../interfaces/Imaterial';
import { GenericService } from 'src/Modules/shared/services/genericCRUD.service';
import { ResponseDto } from '../../shared/interfaces/IResponse.dto';
import { environment } from '../../../environments/environment';

@Injectable({
  providedIn: 'root',
})
export class MaterialService extends GenericService<Material> {
  override controller = 'Material';
  override uri: string = `${environment.apiUrl}${this.controller}`;

  getAllMaterialsForTable() {
    this.loadingData.next(true);
    this.httpClient.get<ResponseDto>(`${this.uri}/AllMaterials`).subscribe({
      next: (data: ResponseDto) => {
        this.dataChange.next(data);
      },
      error: (e) => this.loadingData.next(false),
      complete: () => this.loadingData.next(false),
    });
  }
}
