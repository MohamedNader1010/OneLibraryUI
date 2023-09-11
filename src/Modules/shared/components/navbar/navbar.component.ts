import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
  OnDestroy,
} from "@angular/core";
import { AuthService } from 'src/Modules/authentication.Module/services/auth.service';
import { AttendanceService } from './../../../attendance/services/attendance.service';
import { ToastrService } from 'ngx-toastr';
import { ResponseDto } from '../../interfaces/Iresponse';
import { JwtHelperService } from '@auth0/angular-jwt';
import { Subject, takeUntil } from 'rxjs';
@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnDestroy {
  destroy$ = new Subject<void>();
  constructor(private _jwtHelperService: JwtHelperService, public authService: AuthService, public attendanceService: AttendanceService, private _toastrService: ToastrService) {}

  @Input() opened: boolean | undefined;
  @Output() toggleSidenav = new EventEmitter<boolean>();
  ngOnInit(): void {
    this.authService.username.next(localStorage.getItem('uname'));
    this.attendanceService
      .AttendanceState(localStorage.getItem('uid') ?? '')
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.attendanceService.checkedIn.next(res.body);
        },
      });
  }

  get isAdmin(): boolean {
    return this.extractRoleFromToken() === 'Admin' ? true : false;
  }
  get isUser(): boolean {
    return this.extractRoleFromToken() === 'User' ? true : false;
  }
  private extractRoleFromToken() {
    let token = localStorage.getItem('token')?.toString();
    if (token) {
      const decodedToken = this._jwtHelperService.decodeToken(token);
      const role = decodedToken['http://schemas.microsoft.com/ws/2008/06/identity/claims/role'];
      return role;
    }
    return undefined;
  }
  handleLogout() {
    this.authService.logout();
  }
  handleCheckIn() {
    this.attendanceService
      .checkIn()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.attendanceService.checkedIn.next(true);
          this._toastrService.success(res.message);
        },
        error: (e) => {
          let res: ResponseDto = e.error ?? e;
          this._toastrService.error(res.message);
        },
      });
  }
  handleCheckOut() {
    this.attendanceService
      .checkOut()
      .pipe(takeUntil(this.destroy$))
      .subscribe({
        next: (res) => {
          this.attendanceService.checkedIn.next(false);
          this._toastrService.success(res.message);
        },
        error: (e) => {
          let res: ResponseDto = e.error ?? e;
          this._toastrService.error(res.message);
        },
      });
  }
  toggleParentSidenave = () => this.toggleSidenav.emit(this.opened);

  ngOnDestroy() {
    this.destroy$.next();
    this.destroy$.complete();
  }
}
