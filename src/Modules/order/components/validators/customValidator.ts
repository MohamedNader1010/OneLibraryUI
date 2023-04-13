import {map, Observable, of} from 'rxjs';
import {AbstractControl, ValidatorFn, ValidationErrors, AsyncValidatorFn} from '@angular/forms';
import {OrderService} from '../../services/orders.service';

export function ValidatePaid(orderService: OrderService, id: number): AsyncValidatorFn | null {
	return (control: AbstractControl): Observable<ValidationErrors | null> => {
		return orderService.GetById(id).pipe(
			map((result) => {
				console.log(result.body.rest < control.value);
				return result.body.rest < control.value ? {exceed: true, value: result.body.rest} : null;
			})
		);
	};
}
