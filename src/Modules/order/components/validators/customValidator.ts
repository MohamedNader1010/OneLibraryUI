import {map, Observable} from 'rxjs';
import {AbstractControl, ValidationErrors, AsyncValidatorFn} from '@angular/forms';
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
