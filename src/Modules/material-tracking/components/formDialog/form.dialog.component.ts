import {Component, OnInit, OnDestroy, Inject} from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { tap, takeUntil } from 'rxjs';
import { MaterialTracking } from '../../interfaces/materialTracking';
import { MaterialTrackingService } from '../../services/materialTracking.service';
import { ResponseDto } from './../../../shared/interfaces/Iresponse';
import { MaterialService } from './../../../material/services/material.service';
import { Material } from './../../../material/interfaces/Imaterial';
import { TranslateService } from '@ngx-translate/core';
import { FormsDialogCommonFunctionality } from '../../../shared/classes/FormsDialog';
@Component({
  selector: 'app-form.dialog',
  templateUrl: './form.dialog.html',
  styleUrls: ['./form.dialog.css'],
})
export class FormDialogComponent extends FormsDialogCommonFunctionality implements OnInit, OnDestroy {
  MaterialDataSource: Material[] = [];
  materialLoading = false;
  constructor(
    public dialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MaterialTracking,
    databaseService: MaterialTrackingService,
    private _mat: MaterialService,
    private _fb: FormBuilder,
    translateService: TranslateService,
    toastrService: ToastrService,
  ) {
    super(dialogRef, translateService, databaseService, toastrService);
    this.Form = this._fb.group({
      id: [null],
      materialId: [null, [Validators.required]],
      status: [null],
      quantity: [0],
      comment: [''],
    });
  }
  get quantity(): FormControl {
    return this.Form.get('quantity') as FormControl;
  }
  get materialId(): FormControl {
    return this.Form.get('materialId') as FormControl;
  }
  get status(): FormControl {
    return this.Form.get('status') as FormControl;
  }

  ngOnInit() {
    this.getAllMaterial();
  }

  getAllMaterial = () =>
    this._mat
      .getAll()
      .pipe(
        tap(() => (this.materialLoading = true)),
        takeUntil(this.destroy$),
      )
      .subscribe({
        next: (data) => {
          this.MaterialDataSource = data.body;
        },
        error: (e) => {
          let res: ResponseDto = e.error ?? e;
          this.toastrService.error(res.message);
        },
        complete: () => {
          this.materialLoading = false;
          if (this.data) {
            this.Form.patchValue(this.data);
          }
        },
      });

  setMaterialId = (data: any) => this.materialId.setValue(data);
}
