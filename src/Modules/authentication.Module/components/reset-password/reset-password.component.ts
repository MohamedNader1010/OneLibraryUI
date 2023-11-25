import {Component} from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import { CustomValidators } from '../../customeValidators/CustomValidators';
import { AuthService } from '../../services/auth.service';
import { ResponseDto } from '../../../shared/interfaces/IResponse.dto';
import { Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css'],
})
export class ResetPasswordComponent {
  destroy$ = new Subject<void>();
  form: FormGroup;
  hide = true;
  hideConfirm = true;
  logging: boolean = false;
  constructor(private _route: ActivatedRoute, private _router: Router, private _loginService: AuthService, private _fb: FormBuilder, private _toastrService: ToastrService) {
    this.form = this._fb.group(
      {
        newPassword: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(100)]],
        confirmPassword: ['', [Validators.required, Validators.maxLength(100)]],
        email: [null],
        token: [null],
      },
      { validators: CustomValidators.MatchValidator('newPassword', 'confirmPassword') },
    );
  }
  get confirmPassword(): FormControl {
    return this.form.get('confirmPassword') as FormControl;
  }
  get newPassword(): FormControl {
    return this.form.get('newPassword') as FormControl;
  }
  get email(): FormControl {
    return this.form.get('email') as FormControl;
  }
  get token(): FormControl {
    return this.form.get('token') as FormControl;
  }
  ngOnInit(): void {
    this._route.queryParams.pipe(takeUntil(this.destroy$)).subscribe((res: any) => {
      this.email.setValue(res.email);
      this.token.setValue(res.token);
    });
  }
  handleLogin() {
    this._router.navigate(['auth/login']);
  }
  handleSubmit() {
    if (this.form.valid) {
      this.logging = true;
      this._loginService
        .resetPassword(this.form.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (data) => {
            this._loginService.clearLocalStorage();
            this._toastrService.success(data.message, 'logged in sucessfully');
          },
          error: () => (this.logging = false),
          complete: () => {
            this.logging = false;
            this._router.navigate(['auth/login']);
          },
        });
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
