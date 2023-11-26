import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Material } from '../models/material.model';
import { GenericService } from 'src/app/shared/services/genericCRUD.service';
import { ToastrService } from 'ngx-toastr';
import { ResponseDto } from '../../../../shared/interfaces/IResponse.dto';

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
      error: (e) => this.loadingData.next(false),
      complete: () => this.loadingData.next(false),
    });
  }
}
