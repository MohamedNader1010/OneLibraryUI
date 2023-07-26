import {
  Component,
  EventEmitter,
  Input,
  Output,
  OnInit,
  OnDestroy,
} from "@angular/core";
import { AuthService } from "src/Modules/authentication.Module/services/auth.service";
import { Subscription } from "rxjs";
import { AttendanceService } from "./../../../attendance/services/attendance.service";
import { ToastrService } from "ngx-toastr";
import { Response } from "../../interfaces/Iresponse";
import { JwtHelperService } from "@auth0/angular-jwt";
@Component({
  selector: "app-navbar",
  templateUrl: "./navbar.component.html",
  styleUrls: ["./navbar.component.css"],
})
export class NavbarComponent implements OnInit, OnDestroy {
  subscriptions: Subscription[] = [];
  constructor(
    private _jwtHelper: JwtHelperService,
    public _auth: AuthService,
    public _attendance: AttendanceService,
    private toastr: ToastrService
  ) {}

  @Input() opened: boolean | undefined;
  @Output() toggleSidenav = new EventEmitter<boolean>();
  ngOnInit(): void {
    this._auth.username.next(localStorage.getItem("uname"));
    this._attendance.AttendanceState(localStorage.getItem("uid")??"").subscribe({
      next: (res) =>{
        this._attendance.checkedIn.next(res.body);
      }
    })
  }

  get isAdmin(): boolean {
    return this.extractRoleFromToken() === "Admin" ? true : false;
  }
  get isUser(): boolean {
    return this.extractRoleFromToken() === "User" ? true : false;
  }
  private extractRoleFromToken() {
    let token = localStorage.getItem("token")?.toString();
    if (token) {
      const decodedToken = this._jwtHelper.decodeToken(token);
      const role =
        decodedToken[
          "http://schemas.microsoft.com/ws/2008/06/identity/claims/role"
        ];
      return role;
    }
    return undefined;
  }
  handleLogout() {
    this._auth.logout();
  }
  handleCheckIn() {
    this.subscriptions.push(
      this._attendance.checkIn().subscribe({
        next: (res) => {
          this._attendance.checkedIn.next(true);
          this.toastr.success(res.message);
        },
        error: (e) => {
          let res: Response = e.error ?? e;
          this.toastr.error(res.message);
        },
      })
    );
  }
  handleCheckOut() {
    this.subscriptions.push(
      this._attendance.checkOut().subscribe({
        next: (res) => {
          this._attendance.checkedIn.next(false);
          this.toastr.success(res.message);
        },
        error: (e) => {
          let res: Response = e.error ?? e;
          this.toastr.error(res.message);
        },
      })
    );
  }
  toggleParentSidenave = () => this.toggleSidenav.emit(this.opened);
  ngOnDestroy = () => this.subscriptions.forEach((s) => s.unsubscribe());
}
