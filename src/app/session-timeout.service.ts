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
		const expirationDate = localStorage.getItem('refreshTokenExp');
		if (expirationDate) {
			const expirationTime = new Date(expirationDate).getTime() - new Date().getTime();
			this.timeoutId = setTimeout(() => {
				this.authService.logout();
			}, expirationTime);
			this.addListeners();
		} else {
			this.authService.logout();
		}
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
