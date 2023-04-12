import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ToastrService} from 'ngx-toastr';
@Component({
	selector: 'generic-delete-dialog',
	templateUrl: './generic-delete.dialog.html',
	styleUrls: ['./generic-delete.dialog.css'],
})
export class GenericDeleteDialogComponent {
	isSubmitting: boolean = false;
	constructor(private dialogRef: MatDialogRef<GenericDeleteDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: any[]) {}

	onNoClick = () => this.dialogRef.close();

	confirmDelete = () => this.dialogRef.close(true);
}
