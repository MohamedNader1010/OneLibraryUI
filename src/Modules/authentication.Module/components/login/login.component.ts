import {Component, OnDestroy, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import { Subject, takeUntil } from 'rxjs';
import { Auth } from '../../interfaces/IAuth';
import { AuthService } from './../../services/auth.service';
import { Response } from './../../../shared/interfaces/Iresponse';
import { AttendanceService } from './../../../attendance/services/attendance.service';
import { MatDialog } from '@angular/material/dialog';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<void>();
  loginForm: FormGroup;
  hide = true;
  logging: boolean = false;
  returnUrl: string = '';
  constructor(
    private _router: Router,
    private _dialog: MatDialog,
    private _route: ActivatedRoute,
    private _loginService: AuthService,
    private _fb: FormBuilder,
    private _toastrService: ToastrService,
    private _attendanceService: AttendanceService,
  ) {
    this.loginForm = this._fb.group({
      userName: ['', [Validators.required, Validators.maxLength(100)]],
      password: ['', [Validators.required, Validators.minLength(6), Validators.maxLength(100)]],
    });
  }
  ngOnInit(): void {
    if (this._dialog.openDialogs.length) this._dialog.closeAll();
    this.returnUrl = this._route.snapshot.queryParams['returnUrl'] || '';
  }
  get userName(): FormControl {
    return this.loginForm.get('userName') as FormControl;
  }
  get password(): FormControl {
    return this.loginForm.get('password') as FormControl;
  }
  handleForgetPassword() {
    this._router.navigate(['auth/forgetPassword']);
  }
  handleSubmit() {
    if (this.loginForm.valid) {
      this.logging = true;
      this._loginService
        .login(this.loginForm.value)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
          next: (data) => {
            let auth: Auth = data.body;
            this._loginService.setLocalStorage(auth);
            this._loginService.username.next(auth.username);
            this._attendanceService.checkedIn.next(auth.isCheckedIn);
            this._loginService.isLogged = true;
          },
          error: (e) => {
            this.logging = false;
            this._loginService.isLogged = false;
            this._loginService.username.next(null);
            this._loginService.clearLocalStorage();
            let res: Response = e.error ?? e;
            this._toastrService.error(res.message, 'unauthorized');
          },
          complete: () => {
            this.logging = false;
            this._toastrService.success('loged in sucessfully', 'logged in');
            this._router.navigate([this.returnUrl]);
          },
        });
    }
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
