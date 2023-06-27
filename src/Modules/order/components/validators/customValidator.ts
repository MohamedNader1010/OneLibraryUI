import { map, Observable, of } from "rxjs";
import {
  AbstractControl,
  ValidationErrors,
  AsyncValidatorFn,
  ValidatorFn,
  FormGroup,
} from "@angular/forms";
import { OrderService } from "../../services/orders.service";
import { Status } from "../../Enums/status";

export function ValidatePaid(
  orderService: OrderService,
  id: number
): AsyncValidatorFn | null {
  return (control: AbstractControl): Observable<ValidationErrors | null> => {
    return orderService.GetById(id).pipe(
      map((result) => {
        return result.body.rest < control.value
          ? { exceed: true, value: result.body.rest }
          : null;
      })
    );
  };
}

export function conditionalRequiredValidator(
  requiredValue: string,
  clearErrorsOf: string
): ValidatorFn {
  return (control: AbstractControl): ValidationErrors | null => {
    const condition =
      control.parent?.get("noteOrService")?.value === requiredValue;
    control?.parent?.get(clearErrorsOf)?.clearValidators();
    control?.parent?.get(clearErrorsOf)?.updateValueAndValidity();
    if (condition && !control.value) {
      return { required: true };
    }
    return null;
  };
}
export function validateQuantityAsync(
  control: AbstractControl
): Observable<ValidationErrors | null> {
  const formGroup = control.parent as FormGroup;
  if (!formGroup) {
    return of(null);
  }
  const isReceivedStatus =
    formGroup.controls["orderStatus"].value == Status.استلم;
  const isNote = formGroup.controls["noteId"].value;
  const availableNoteQuantity = formGroup.get("availableNoteQuantity")?.value;

  if (availableNoteQuantity == 0 && isReceivedStatus && isNote) {
    return of({
        exceedQuantity: { value: true, availableQuantity: availableNoteQuantity },
      });
  }

  if (availableNoteQuantity != 0 && isNote) {
    if (control.value > availableNoteQuantity && isReceivedStatus) {
      return of({
        exceedQuantity: { value: true, availableQuantity: availableNoteQuantity },
      });
    }
  }
  return of(null);
}
