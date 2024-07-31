import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { Auth } from '../../interfaces/IAuth';
import { ResponseDto } from '../../../../shared/interfaces/response.dto';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.css'],
})
export class ConfirmEmailComponent implements OnInit {
  constructor(private _route: ActivatedRoute, private _toastrService: ToastrService, private _router: Router, private _authService: AuthService) {}

  ngOnInit() {
    this._route.queryParams.subscribe((res: any) => {
      this._authService.confirmEmail(res.userid, res.token).subscribe({
        next: (data: ResponseDto) => {
          let auth: Auth = data.body;
          this._authService.setLocalStorage(auth);
          this._authService.username.next(auth.username);
          this._authService.isLogged = true;
          this._toastrService.success(data.message, 'logged in');
        },
        error: (e) => {
          this._authService.isLogged = false;
          this._authService.username.next(null);
          this._authService.clearLocalStorage();
        },
        complete: () => {
          this._router.navigate(['']);
        },
      });
    });
  }
}
