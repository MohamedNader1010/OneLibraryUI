import {map, Observable} from 'rxjs';
import {AbstractControl, ValidationErrors, AsyncValidatorFn, ValidatorFn} from '@angular/forms';
import {OrderService} from '../../services/orders.service';

export function ValidatePaid(orderService: OrderService, id: number): AsyncValidatorFn | null {
	return (control: AbstractControl): Observable<ValidationErrors | null> => {
		return orderService.GetById(id).pipe(
			map((result) => {
				return result.body.rest < control.value ? {exceed: true, value: result.body.rest} : null;
			})
		);
	};
}

export function conditionalRequiredValidator(requiredValue: string, clearErrorsOf: string): ValidatorFn {
	return (control: AbstractControl): ValidationErrors | null => {
		const condition = control.parent?.get('noteOrService')?.value === requiredValue;
		control?.parent?.get(clearErrorsOf)?.clearValidators();
		control?.parent?.get(clearErrorsOf)?.updateValueAndValidity();
		if (condition && !control.value) {
			return {required: true};
		}
		return null;
	};
}
