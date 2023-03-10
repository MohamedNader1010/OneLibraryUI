import {Component, ViewChild} from '@angular/core';

@Component({
	selector: 'shared-root',
	templateUrl: './shared.component.html',
	styleUrls: ['./shared.component.css'],
})
export class SharedComponent {
	@ViewChild('sidenav') sidenav: any;
	showFiller = false;
	toggleSidenav(isOpened: boolean) {
		isOpened ? this.sidenav.close() : this.sidenav.open();
	}
}
