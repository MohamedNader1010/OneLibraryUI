import { Component, OnInit } from '@angular/core';
import { JwtHelperService } from '@auth0/angular-jwt';
import { ToastrService } from 'ngx-toastr';
import { Subject } from 'rxjs';
import { AuthService } from '../../../core/authentication/services/auth.service';
import { AttendanceService } from '../../../core/data/services/attendance.service';
import { OrderService } from '../../../core/data/services/orders.service';
import { Roles } from '../../enums/roles.enum';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
  destroy$ = new Subject<void>();
  constructor(
    private _jwtHelperService: JwtHelperService,
    public authService: AuthService,
    public attendanceService: AttendanceService,
    private _toastrService: ToastrService,
    private _orderService: OrderService,
  ) {}

  private _hasUnFinishedOrders: boolean = true;
  ngOnInit(): void {
    this.authService.username.next(localStorage.getItem('uname'));
    this.attendanceService.AttendanceState(localStorage.getItem('uid') ?? '').subscribe({
      next: (res) => {
        this.attendanceService.checkedIn.next(res.body);
      },
    });
  }

  get isAdmin(): boolean {
    return this.extractRoleFromToken() === Roles.Admin ? true : false;
  }
  get isUser(): boolean {
    return this.extractRoleFromToken() === Roles.User ? true : false;
  }
  get isAdminWithoutBank(): boolean {
    return this.extractRoleFromToken() === Roles.AdminWithoutBank ? true : false;
  }
  get hasUnFinishedOrders(): boolean {
    return this._hasUnFinishedOrders;
  }
  private checkUnfinishedOrders(): void {
    this._orderService.getAllUnfinishedOrders().subscribe({
      next: (res) => {
        this._hasUnFinishedOrders = Array.isArray(res.body) && res.body.length > 0;
      },
    });
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
    this.attendanceService.checkIn().subscribe({
      next: (res) => {
        this.attendanceService.checkedIn.next(true);
        this._toastrService.success(res.message);
      },
    });
  }
  handleCheckOut() {
    this.attendanceService.checkOut().subscribe({
      next: (res) => {
        this.attendanceService.checkedIn.next(false);
        this._toastrService.success(res.message);
      },
    });
  }
  startNewFiscalYear() {
    console.log('start new fiscal year');
  }
}
