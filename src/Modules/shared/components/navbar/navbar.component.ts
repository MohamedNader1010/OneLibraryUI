import {Component, EventEmitter, Input, Output} from '@angular/core';
import {Router} from '@angular/router';
import {AuthService} from 'src/Modules/authentication.Module/services/auth.service';

@Component({
	selector: 'app-navbar',
	templateUrl: './navbar.component.html',
	styleUrls: ['./navbar.component.css'],
})
export class NavbarComponent {
	@Input() opened: boolean | undefined;
	@Output() toggleSidenav = new EventEmitter<boolean>();
	constructor(public data: AuthService, private router: Router) {}
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
