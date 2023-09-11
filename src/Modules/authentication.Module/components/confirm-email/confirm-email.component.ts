import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { AuthService } from '../../services/auth.service';
import { Subject, takeUntil } from 'rxjs';
import { Auth } from '../../interfaces/IAuth';
import { ResponseDto } from '../../../shared/interfaces/Iresponse';

@Component({
  selector: 'app-confirm-email',
  templateUrl: './confirm-email.component.html',
  styleUrls: ['./confirm-email.component.css'],
})
export class ConfirmEmailComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<void>();
  constructor(private _route: ActivatedRoute, private _toastrService: ToastrService, private _router: Router, private _authService: AuthService) {}

  ngOnInit() {
    this._route.queryParams.pipe(takeUntil(this.destroy$)).subscribe((res: any) => {
      this._authService
        .confirmEmail(res.userid, res.token)
        .pipe(takeUntil(this.destroy$))
        .subscribe({
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
            let res: ResponseDto = e.error ?? e;
            this._toastrService.error(res.message, 'unauthorized');
          },
          complete: () => {
            this._router.navigate(['']);
          },
        });
    });
  }

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
