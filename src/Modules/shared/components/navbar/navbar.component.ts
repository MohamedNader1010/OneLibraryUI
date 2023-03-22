import {Component, EventEmitter, Input, Output, OnInit, OnDestroy} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from 'src/Modules/authentication.Module/services/auth.service';
import {Subscription} from 'rxjs';
import {AttendanceService} from './../../../attendance/services/attendance.service';
import {ToastrService} from 'ngx-toastr';
import {Response} from '../../interfaces/Iresponse';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit, OnDestroy {
	subscriptions: Subscription[] = [];
	constructor(public data: AuthService, public _attendance: AttendanceService, private router: Router, private toastr: ToastrService) {}
	@Input() opened: boolean | undefined;
	@Output() toggleSidenav = new EventEmitter<boolean>();
	ngOnInit(): void {
		this.data.username.next(localStorage.getItem('uname'));
		this._attendance.checkedIn.next(localStorage.getItem('iSCheckedIn')?.toString().toLowerCase() == 'true');
	}
	handleLogout() {
		this.data.clearLocalStorage();
		this.router.navigate(['/auth/login']);
	}
	handleLogin() {
		this.router.navigate(['']);
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
