import { AbstractControl, ValidationErrors, ValidatorFn } from '@angular/forms';

export function MatchValidator(source: string, target: string): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const sourceCtrl = control.get(source);
        const targetCtrl = control.get(target);
        return sourceCtrl?.value !== targetCtrl?.value ? { mismatch: true } : null;
    };
}

export function PasswordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
        const value = control.value;
        if (!value) return null;

        const hasUpperCase = /[A-Z]/.test(value);
        const hasLowerCase = /[a-z]/.test(value);
        const hasDigit = /\d/.test(value);
        const hasMinLength = value.length >= 8;

        if (!hasUpperCase || !hasLowerCase || !hasDigit || !hasMinLength) {
            return { passwordStrength: true };
        }
        return null;
    };
}
