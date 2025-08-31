// import { Component, inject, OnInit } from '@angular/core';
// import { FormControl, Validators } from '@angular/forms';
// import { MAT_DIALOG_DATA } from '@angular/material/dialog';
// import { PaymentMethod } from "../../../../core/enums/payment-method.enum";
// import { UnitOfWorkService } from "../../../../core/services/unit-of-work.service";
// import { BaseForm } from "../../../../shared/classes/base-form.abstract";

// @Component({
//   selector: 'app-payTeacherProfit',
//   templateUrl: './payTeacherProfit.component.html',
//   styleUrls: ['./payTeacherProfit.component.css'],
// })
// export class PayTeacherProfitFormDialogComponent extends BaseForm implements OnInit {
//   unitOfWorkService = inject(UnitOfWorkService);
//   data: ITeacherProfitWithNotes = inject(MAT_DIALOG_DATA);
//   // override matDialogRef = inject(MatDialogRef<PayTeacherProfitFormDialogComponent>);

//   paymentMethods = [
//     { value: PaymentMethod.Cash, name: 'نقدي' },
//     { value: PaymentMethod.Wallet, name: 'محفظة' },
//     { value: PaymentMethod.Instapay, name: 'Instapay' },
//   ];
//   incomeOutcomeSources = [
//     { value: TransactionSource.daily, name: 'اليومية' },
//     { value: TransactionSource.Bank, name: 'البنك' },
//   ];
//   MaterialDataSource: Material[] = [];

//   get amount(): FormControl {
//     return this.Form.get('amount') as FormControl;
//   }
//   get clientId(): FormControl {
//     return this.Form.get('clientId') as FormControl;
//   }

//   get paymentMethod(): FormControl {
//     return this.Form.get('paymentMethod') as FormControl;
//   }

//   get source(): FormControl {
//     return this.Form.get('source') as FormControl;
//   }

//   ngOnInit() {
//     this.Form = this.fb.group({
//       date: [new Date()],
//       amount: [null, [Validators.min(0.1)]],
//       clientId: [null],
//       source: [TransactionSource.daily],
//       paymentMethod: [PaymentMethod.Cash],
//     });
//     this.clientId.setValue(this.data.clientId);
//     this.amount.addValidators(Validators.max(this.data.rest));
//   }

//   handleSubmit() {
//     if (!this.Form.valid) return;

//     this.isSubmitting = true;
//     // this.unitOfWorkService.client.addTeacherEarning(this.Form.value).subscribe({
//     //   next: (res) => {
//     //     this.tableCommunicationService.reloadTable$.next();
//     //     this.matDialogRef.close({ res: res, row: this.data });
//     //   },
//     //   error: () => (this.isSubmitting = false),
//     //   complete: () => {
//     //     this.isSubmitting = false;
//     //   },
//     // });
//   }

//   OnDestroy(): void {
//     this.unitOfWorkService.unsubscribe();
//   }
// }
