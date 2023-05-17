import {Component, Inject, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {MaterialService} from '../../services/material.service';
import {MAT_DIALOG_DATA, MatDialogRef} from '@angular/material/dialog';
import {Material} from '../../interfaces/Imaterial';
import {ToastrService} from 'ngx-toastr';
import {TranslateService} from '@ngx-translate/core';
import {FormsDialogCommonFunctionality} from 'src/Modules/shared/classes/FormsDialog';
@Component({
	selector: 'app-material-form-dialog',
	templateUrl: './material-form-dialog.component.html',
	styleUrls: ['./material-form-dialog.component.css'],
})
export class MaterialFormDialogComponent extends FormsDialogCommonFunctionality implements OnInit {
	constructor(
		@Inject(MAT_DIALOG_DATA) private data: Material,
		translate: TranslateService,
		_material: MaterialService,
		private fb: FormBuilder,
		matDialogRef: MatDialogRef<MaterialFormDialogComponent>,
		toastr: ToastrService
	) {
		super(matDialogRef, translate, _material, toastr);
		this.initiateFormControls();
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
		if (this.data) this.Form.patchValue(this.data);
	}

	handleSubmit() {
		if (this.Form.valid) {
			this.isSubmitting = true;
			if (this.id.value) this.update(this.data.id, this.Form.value);
			else this.add(this.Form.value);
		}
	}
}
