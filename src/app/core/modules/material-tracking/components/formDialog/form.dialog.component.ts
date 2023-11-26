import { Component, OnInit, OnDestroy, Inject } from '@angular/core';
import { FormBuilder, Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { TranslateService } from '@ngx-translate/core';
import { ToastrService } from 'ngx-toastr';
import { tap, takeUntil } from 'rxjs';
import { FormsDialogCommonFunctionality } from '../../../../../shared/classes/FormsDialog';
import { TransactionStatus } from '../../../../../shared/enums/TransactionStatus.enum';
import { Material } from '../../../../data/project-management/models/material.model';
import { MaterialTracking } from '../../../../data/project-management/models/materialTracking.model';
import { MaterialService } from '../../../../data/project-management/repositories/material.service';
import { MaterialTrackingService } from '../../../../data/project-management/repositories/materialTracking.service';
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
    this.quantity.valueChanges.subscribe((value) => this.status.setValue(value > 0 ? TransactionStatus.وارد : TransactionStatus.صادر));
  }

  getAllMaterial() {
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
        error: () => (this.isSubmitting = false),
        complete: () => {
          this.materialLoading = false;
          if (this.data) {
            this.Form.patchValue(this.data);
          }
        },
      });
  }

  setMaterialId = (data: any) => this.materialId.setValue(data);
}
