import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Material} from '../interfaces/Imaterial';
import {GenericService} from 'src/Modules/shared/services/genericCRUD.service';
import { ToastrService } from 'ngx-toastr';
import { ResponseDto } from '../../shared/interfaces/Iresponse';

@Injectable({
  providedIn: 'root',
})
export class MaterialService extends GenericService<Material> {
  constructor(http: HttpClient, toastrService: ToastrService) {
    super(http, 'Material', toastrService);
  }

  getAllMaterialsForTable() {
    this.loadingData.next(true);
    this.http.get<ResponseDto>(`${this.uri}/AllMaterials`).subscribe({
      next: (data: ResponseDto) => {
        this.dataChange.next(data);
      },
      error: (e) => {
        this.loadingData.next(false);
        let res: ResponseDto = e.error ?? e;
        this._toastrService.error(res.message);
      },
      complete: () => this.loadingData.next(false),
    });
  }
}
