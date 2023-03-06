import {Component, EventEmitter, Input, Output, OnInit} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from 'src/Modules/authentication.Module/services/auth.service';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent implements OnInit {
	@Input() opened: boolean | undefined;
	@Output() toggleSidenav = new EventEmitter<boolean>();
	constructor(public data: AuthService, private router: Router) {}
	ngOnInit(): void {
		this.data.username.next(localStorage.getItem('uname'));
	}
	handleLogout() {
		localStorage.removeItem('token');
		localStorage.removeItem('refreshToken');
		localStorage.removeItem('uname');
		this.router.navigate(['/auth/login']);
	}
	handleLogin() {
		this.router.navigate(['']);
	}
	toggleParentSidenave() {
		this.toggleSidenav.emit(this.opened);
	}
}
