import {Component, ViewChild} from "@angular/core";

@Component({
	selector: "shared-root",
	templateUrl: "./shared.component.html",
	styleUrls: ["./shared.component.css"],
})
export class SharedComponent {
	@ViewChild("sidenav") sidenav: any;
	showFiller = false;
	toggleSidenav(isOpened: boolean) {
		if (isOpened) this.sidenav.close();
		else this.sidenav.open();
	}
}
