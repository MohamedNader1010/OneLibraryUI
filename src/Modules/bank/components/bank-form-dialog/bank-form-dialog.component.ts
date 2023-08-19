import { Component, Inject, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormControl, Validators } from "@angular/forms";
import { MAT_DIALOG_DATA, MatDialogRef } from "@angular/material/dialog";
import { TranslateService } from "@ngx-translate/core";
import { ToastrService } from "ngx-toastr";
import { EmployeeFormDialogComponent } from "../../../employee/components/employee-form-dialog/employee-form-dialog.component";
import { Employee } from "../../../employee/interFaces/Iemployee";
import { FormsDialogCommonFunctionality } from "../../../shared/classes/FormsDialog";
import { BankService } from "../../services/bank.service";
import { Response } from "../../../shared/interfaces/Iresponse";

@Component({
  selector: 'app-bank-form-dialog',
  templateUrl: './bank-form-dialog.component.html',
  styleUrls: ['./bank-form-dialog.component.css']
})
export class BankFormDialogComponent extends FormsDialogCommonFunctionality implements OnInit, OnDestroy {
	constructor(
		private _bank: BankService,
		private fb: FormBuilder,
		public override toastr: ToastrService,
		translate: TranslateService,
		@Inject(MAT_DIALOG_DATA) public data: Employee,
		matDialogRef: MatDialogRef<EmployeeFormDialogComponent>
	) {
		super(matDialogRef, translate, _bank, toastr);
		this.initiateFormControls();
	}

	get startingBalance(): FormControl {
		return this.Form.get('startingBalance') as FormControl;
	}

	private initiateFormControls() {
		this.Form = this.fb.group({
      id: [3],
      startingBalance: [null, [Validators.required]],
    });
	}
	ngOnInit(): void {

	}

	handleSubmit() {
		if (this.Form.valid) {
			this.setStartingPalance(this.Form.value);
		}
	}

	setStartingPalance = (values: any) => this.subscriptions.push(this._bank.SetStartingPalance(values).subscribe({
    next: (res) => {
      this.matDialogRef.close({ data: res });
    },
    error: (e) => {
      this.isSubmitting = false;
      let res: Response = e.error ?? e;
      this.toastr.error(res.message);
    },
    complete: () => {
      this.isSubmitting = false;
    },
  }));
}
