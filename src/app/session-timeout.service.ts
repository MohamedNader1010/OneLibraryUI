import {Injectable} from '@angular/core';
import {AuthService} from 'src/Modules/authentication.Module/services/auth.service';

@Injectable({
	providedIn: 'root',
})
export class SessionTimeoutService {
	timeoutId: any = null;

	constructor(private authService: AuthService) {}

	resetTimer = () => {
		clearTimeout(this.timeoutId);
		this.startTimeout();
	};

	startTimeout = () => {
		this.timeoutId = setTimeout(() => {
			this.authService.logout();
		}, 900000); // 15 minutes in milliseconds
		this.addListeners();
	};

	stopTimeout = () => {
		this.removeListeners();
		clearTimeout(this.timeoutId);
	};

	addListeners() {
		window.addEventListener('mousemove', this.resetTimer, true);
		window.addEventListener('mousedown', this.resetTimer, true);
		window.addEventListener('keypress', this.resetTimer, true);
		window.addEventListener('touchmove', this.resetTimer, true);
	}

	removeListeners() {
		window.removeEventListener('mousemove', this.resetTimer, true);
		window.removeEventListener('mousedown', this.resetTimer, true);
		window.removeEventListener('keypress', this.resetTimer, true);
		window.removeEventListener('touchmove', this.resetTimer, true);
	}
}
