import { FormsDialogCommonFunctionality } from './../../../shared/classes/FormsDialog';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Subscription } from 'rxjs';
import { MaterialService } from '../../services/material.service';
import { TranslateService } from '@ngx-translate/core';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { DialogServiceService } from 'src/Modules/shared/services/dialog-service.service';
import { Material } from '../../interfaces/Imaterial';

@Component({
  selector: 'app-material-form-dialog',
  templateUrl: './material-form-dialog.component.html',
  styleUrls: ['./material-form-dialog.component.css'],
})
export class MaterialFormDialogComponent extends FormsDialogCommonFunctionality implements OnInit {
  subscriptions: Subscription[] = [];
  Form!: FormGroup;
  controllerName: string = 'materials';
  isSubmitted: boolean = false;

  constructor(
    private translate: TranslateService,
    private _material: MaterialService,
    private fb: FormBuilder,
    @Inject(MAT_DIALOG_DATA) private data: Material,
    private matDialogRef: MatDialogRef<MaterialFormDialogComponent>,
    private dialogService: DialogServiceService,
    private matDialogg: MatDialog
  ) {
    super(matDialogRef, dialogService, translate, matDialogg);
    this.initiateFormControls()

  }

  get id(): FormControl {
    return this.Form.get('id') as FormControl;
  }
  get name(): FormControl {
    return this.Form.get('name') as FormControl;
  }
  get price(): FormControl {
    return this.Form.get('price') as FormControl;
  }

  private initiateFormControls() {
    this.Form = this.fb.group({
      id: [null],
      name: ['', [Validators.required, Validators.maxLength(100)]],
      price: [null, [Validators.required]],

    });
  }

  ngOnInit(): void {
    if (this.data)
      this.getSingle(this.data.id);

  }

  getSingle = (id: number) =>
    this.subscriptions.push(
      this._material.getOne(id).subscribe((data) => {
        this.Form.patchValue(data);
      })
    );

  handleSubmit() {
    if (this.Form.valid) {
      if (this.data)
        this.subscriptions.push(
          this._material.update(this.data.id, this.Form.value).subscribe(() => {
            this.isSubmitted = true;
            this.back()
          })
        );
      else {
        this.id.setValue(0)
        this.subscriptions.push(
          this._material.add(this.Form.value).subscribe(() => {
            this.isSubmitted = true;
            this.back();
          })
        );
      }

    }
  }
  ngOnDestroy() {
    this.subscriptions.forEach((s) => s.unsubscribe());
  }
}
