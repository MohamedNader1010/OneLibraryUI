import {Component} from '@angular/core';
import {FormGroup, FormBuilder, Validators, FormControl} from '@angular/forms';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { ResponseDto } from '../../../shared/interfaces/IResponse.dto';

@Component({
  selector: 'app-forget-password',
  templateUrl: './forget-password.component.html',
  styleUrls: ['./forget-password.component.css'],
})
export class ForgetPasswordComponent {
  form: FormGroup;
  hide = true;
  logging: boolean = false;
  constructor(private _router: Router, private _loginService: AuthService, private _fb: FormBuilder, private _toastrService: ToastrService) {
    this.form = this._fb.group({
      email: ['', [Validators.required, Validators.email, Validators.pattern(`^.+@.+\..+$`)]],
    });
  }
  get email(): FormControl {
    return this.form.get('email') as FormControl;
  }
  handleLogin() {
    this._router.navigate(['auth/login']);
  }
  handleSubmit() {
    if (this.form.valid) {
      this.logging = true;
      this._loginService.forgetPassword(this.email.value).subscribe({
        next: (data) => {
          this._toastrService.success(data.message, 'check your email');
        },
        error: () => (this.logging = false),
        complete: () => {
          this.logging = false;
          this._router.navigate(['']);
        },
      });
    }
  }
}
