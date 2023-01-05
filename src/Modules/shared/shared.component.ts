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
		isOpened ? this.sidenav.close() : this.sidenav.open();
	}

	// subscriptions: Subscription[] = [];
	// onlineEvent!: Observable<Event>;
	// offlineEvent!: Observable<Event>;
	// connectionStatusMessage!: string;
	// connectionStatus!: string;
	// ngOnInit(): void {
	// 	this.onlineEvent = fromEvent(window, "online");
	// 	this.offlineEvent = fromEvent(window, "offline");
	// 	this.subscriptions.push(
	// 		this.onlineEvent.subscribe((e) => {
	// 			this.connectionStatusMessage = "Back to online";
	// 			this.connectionStatus = "online";
	// 			console.log("Online...");
	// 		})
	// 	);
	// 	this.subscriptions.push(
	// 		this.offlineEvent.subscribe((e) => {
	// 			this.connectionStatusMessage = "Connection lost! You are not connected to internet";
	// 			this.connectionStatus = "offline";
	// 			console.log("Offline...");
	// 		})
	// 	);
	// }
	// ngOnDestroy() {
	// 	this.subscriptions.forEach((s) => s.unsubscribe());
	// }
}
