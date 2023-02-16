import {AbstractControl, AsyncValidatorFn, ValidationErrors, ValidatorFn} from '@angular/forms';
import {EmployeeService} from 'src/Modules/employee/services/employee.service';
import {map, Observable} from 'rxjs';

// UserNameValidator(source: string): AsyncValidatorFn {
// 	return (control: AbstractControl): Observable<ValidationErrors | null> => {
// 		const sourceCtrl = control.get(source);
// 		return this.emp.validateUsername(sourceCtrl?.value).pipe(map((res) => (res.status ? null : {usernameExist: true})));
// 	};
// }
export function EmailValidator(emp: EmployeeService, source: string): AsyncValidatorFn {
	return (control: AbstractControl) => {
		const sourceCtrl = control.get(source);
		console.log(sourceCtrl);
		return emp.validateEmail(sourceCtrl?.value).pipe(map((res) => (res.status ? null : {emailExist: true})));
	};
}
export function MatchValidator(source: string, target: string): ValidatorFn {
	return (control: AbstractControl): ValidationErrors | null => {
		const sourceCtrl = control.get(source);
		const targetCtrl = control.get(target);
		return sourceCtrl && targetCtrl && sourceCtrl.value !== targetCtrl.value ? {mismatch: true} : null;
	};
}
