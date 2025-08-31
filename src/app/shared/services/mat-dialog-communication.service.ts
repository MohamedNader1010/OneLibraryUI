import { Injectable } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';

@Injectable({ providedIn: 'root' })
export class MatDialogCommunicationService {
    openedDialogs: MatDialogRef<any, any>[] = [];

    closeAllDialogs() {
        this.openedDialogs.forEach((dialog) => dialog.close());
    }

    closeDialog(dialog: MatDialogRef<any, any>) {
        dialog.close();
    }

    addDialog(dialog: MatDialogRef<any, any>) {
        this.openedDialogs.push(dialog);
    }

    removeDialog(dialog: MatDialogRef<any, any>) {
        this.openedDialogs = this.openedDialogs.filter((d) => d !== dialog);
    }
}
