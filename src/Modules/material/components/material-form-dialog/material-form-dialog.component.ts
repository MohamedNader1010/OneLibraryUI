import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MaterialService} from '../../services/material.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Material} from '../../interfaces/Imaterial';
import {ToastrService} from 'ngx-toastr';
import {TranslateService} from '@ngx-translate/core';
import { FormsDialogCommonFunctionality } from 'src/Modules/shared/classes/FormsDialog';
@Component({
  selector: 'app-material-form-dialog',
  templateUrl: './material-form-dialog.component.html',
  styleUrls: ['./material-form-dialog.component.css'],
})
export class MaterialFormDialogComponent extends FormsDialogCommonFunctionality implements OnInit {
  constructor(
    @Inject(MAT_DIALOG_DATA) private _data: Material,
    translateService: TranslateService,
    _databaseService: MaterialService,
    private _fb: FormBuilder,
    matDialogRef: MatDialogRef<MaterialFormDialogComponent>,
    toastrService: ToastrService,
  ) {
    super(matDialogRef, translateService, _databaseService, toastrService);
    this.initiateFormControls();
  }

  get name(): FormControl {
    return this.Form.get('name') as FormControl;
  }
  get price(): FormControl {
    return this.Form.get('price') as FormControl;
  }

  private initiateFormControls() {
    this.Form = this._fb.group({
      id: [null],
      name: ['', [Validators.required, Validators.maxLength(100)]],
      price: [null, [Validators.required]],
    });
  }

  ngOnInit(): void {
    if (this._data) this.Form.patchValue(this._data);
  }
}
