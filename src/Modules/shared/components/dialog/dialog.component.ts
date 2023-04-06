import { Component, EventEmitter, Inject, Output } from "@angular/core";
import { MAT_DIALOG_DATA } from "@angular/material/dialog";
import { DialogServiceService } from "../../services/dialog-service.service";

@Component({
	selector: "app-dialog",
	templateUrl: "./dialog.component.html",
	styleUrls: ["./dialog.component.css"],
})
export class DialogComponent {
	constructor(@Inject(MAT_DIALOG_DATA) public data: any) { }


}

