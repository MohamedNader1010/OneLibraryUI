import { EventEmitter, HostListener, Injectable, Output } from "@angular/core";
import { MatDialog, MatDialogRef } from "@angular/material/dialog";
import { DialogServiceService } from "../services/dialog-service.service";
import { TranslateService } from "@ngx-translate/core";
import { DialogComponent } from "../components/dialog/dialog.component";

@Injectable()
export class FormsDialogCommonFunctionality {

    @HostListener('window:beforeunload', ['$event'])
    unloadNotification($event: any) {

    }
    @Output() onClose = new EventEmitter();
    constructor(
        public dRef: MatDialogRef<any>,
        public dService: DialogServiceService,
        public tranlsate: TranslateService,
        private matDialog?: MatDialog
    ) {

    }
    public back = () => {
        this.closeAllOpenedDialogs()
    }
    public closeAllOpenedDialogs() {
        this.dRef.close();
        this.dService.closeDialog()
        this.onClose.emit();
    }
}