import {Component, OnDestroy} from '@angular/core';
import {OnInit} from '@angular/core';
import {AuthService} from '../../services/auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {ToastrService} from 'ngx-toastr';
import {Auth} from '../../interfaces/IAuth';
import {Subscription, lastValueFrom} from 'rxjs';

@Component({
	selector: 'app-confirm-email',
	templateUrl: './confirm-email.component.html',
	styleUrls: ['./confirm-email.component.css'],
})
export class ConfirmEmailComponent implements OnInit, OnDestroy {
	constructor(private _auth: AuthService, private route: ActivatedRoute, private toastr: ToastrService, private router: Router) {}
	subscriptions: Subscription[] = [];
	ngOnInit(): void {
		this.subscriptions.push(
			this.route.queryParams.subscribe((res: any) => {
				this.subscriptions.push(
					this._auth.confirmEmail(res.userid, res.token).subscribe({
						next: (data: Auth) => {
							console.log(data);
							localStorage.setItem('token', data.token);
							localStorage.setItem('refreshToken', data.refreshToken);
							localStorage.setItem('uname', data.username);
						},
						error: (e) => {
							this._auth.isLogged = false;
							this.toastr.error(e.error, 'unauthorized');
						},
						complete: () => {
							this.router.navigate(['']);
							this.toastr.success('loged in successfully', 'logged in');
						},
					})
				);
			})
		);
	}
	ngOnDestroy = () => this.subscriptions.forEach((sub) => sub.unsubscribe());
}
