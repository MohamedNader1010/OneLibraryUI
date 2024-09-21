import { Component, OnInit, Inject } from '@angular/core';
import { Validators, FormControl } from '@angular/forms';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { tap } from 'rxjs';
import { MaterialTracking } from '../../../../core/data/models/material-transaction/materialTracking';
import { Material } from '../../../../core/data/models/material/Imaterial';
import { MaterialService } from '../../../../core/data/services/material.service';
import { MaterialTrackingService } from '../../../../core/data/services/material-tracking.service';
import { TransactionStatus } from '../../../../shared/enums/TransactionStatus.enum';
import { BaseForm } from '../../../../shared/classes/base-form.abstract';
@Component({
  selector: 'app-form.dialog',
  templateUrl: './form.dialog.html',
  styleUrls: ['./form.dialog.css'],
})
export class FormDialogComponent extends BaseForm implements OnInit {
  MaterialDataSource: Material[] = [];
  materialLoading = false;
  constructor(
    override matDialogRef: MatDialogRef<FormDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: MaterialTracking,
    private _databaseService: MaterialTrackingService,
    private _materialService: MaterialService,
  ) {
    super();
    this.Form = this.fb.group({
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
    this.quantity.valueChanges.subscribe((value) => this.status.setValue(value > 0 ? TransactionStatus.Credit : TransactionStatus.Debit));
  }

  getAllMaterial() {
    this._materialService
      .getAllOverview()
      .pipe(tap(() => (this.materialLoading = true)))
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

  add = (values: any) => this._databaseService.add(values).subscribe(this.closeDialogAndRefreshTable());

  update = (id: number, values: any) => this._databaseService.update(id, values).subscribe(this.closeDialogAndRefreshTable());

  handleSubmit() {
    if (!this.Form.valid) return;
    this.isSubmitting = true;
    const id = this.id?.value;
    id ? this.update(id, this.Form.value) : this.add(this.Form.value);
  }
}
