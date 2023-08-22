import { map, Observable, of } from 'rxjs';
import { AbstractControl, ValidationErrors, AsyncValidatorFn, ValidatorFn, FormGroup, FormArray } from '@angular/forms';
import { OrderService } from '../../services/orders.service';
import { Status } from '../../Enums/status';

export function ValidatePaid(orderService: OrderService, id: number): AsyncValidatorFn | null {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return orderService.GetById(id).pipe(map((result) => (result.body.rest < control.value ? { exceed: true, value: result.body.rest } : null)));
  };
}

export function validateQuantityAsync(previousStatus: Status | null): AsyncValidatorFn {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    if (previousStatus && (previousStatus === Status.استلم || previousStatus === Status.جاهز)) return of(null);
    const formGroup = control.parent as FormGroup;
    if (!formGroup) return of(null);
    const isReceivedStatus = formGroup.controls['orderStatus'].value === Status.استلم;
    const isNote = formGroup.controls['noteId'].value;
    const availableNoteQuantity = (+formGroup.get('availableNoteQuantity')?.value).toFixed(2);
    const exceedQuantityError = {
      exceedQuantity: {
        value: true,
        availableQuantity: availableNoteQuantity,
      },
    };
    if (isNote && isReceivedStatus && control.value > availableNoteQuantity) {
      formGroup.get('quantity')?.markAsTouched();
      return of(exceedQuantityError);
    }
    return of(null);
  };
}

export function validateArrayLingth(arrayName: string, requiredLength: number = 1): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    let array = control.get(arrayName) as FormArray;
    return array.length < requiredLength ? { noDetails: true } : null;
  };
}
