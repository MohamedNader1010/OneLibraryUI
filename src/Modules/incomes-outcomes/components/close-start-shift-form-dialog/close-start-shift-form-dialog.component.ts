import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from "@angular/forms"
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog"
import { TranslateService } from "@ngx-translate/core"
import { ToastrService } from "ngx-toastr"
import { FormsDialogCommonFunctionality } from "../../../shared/classes/FormsDialog"
import { Employee } from "../../../employee/interFaces/Iemployee"
import { EmployeeFormDialogComponent } from "../../../employee/components/employee-form-dialog/employee-form-dialog.component"
import { ShiftService } from "../../services/shift.service"

@Component({
  selector: 'app-close-start-shift-form-dialog',
  templateUrl: './close-start-shift-form-dialog.component.html',
  styleUrls: ['./close-start-shift-form-dialog.component.css']
})
export class CloseStartShiftFormDialogComponent extends FormsDialogCommonFunctionality implements OnInit, OnDestroy {
	constructor(
		private _shift: ShiftService,
		private fb: FormBuilder,
		public override toastr: ToastrService,
		translate: TranslateService,
		@Inject(MAT_DIALOG_DATA) public data: Employee,
		matDialogRef: MatDialogRef<EmployeeFormDialogComponent>
	) {
		super(matDialogRef, translate, _shift, toastr);
		this.initiateFormControls();
	}

	get guarante(): FormControl {
		return this.Form.get('guarante') as FormControl;
	}
	get bankGuarante(): FormControl {
		return this.Form.get('bankGuarante') as FormControl;
	}

	private initiateFormControls() {
		this.Form = this.fb.group({
			guarante: [null],
			bankGuarante: [null]
		});
	}
	ngOnInit(): void {

	}

	handleSubmit() {
		if (this.Form.valid) {
			this.add(this.Form.value);
		}
	}
}
