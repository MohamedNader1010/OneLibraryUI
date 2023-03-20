import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ToastrService} from 'ngx-toastr';
import {MaterialTracking} from '../../interfaces/materialTracking';
import {MaterialTrackingService} from '../../services/materialTracking.service';

@Component({
	selector: 'app-delete.dialog',
	templateUrl: './delete.dialog.html',
	styleUrls: ['./delete.dialog.css'],
})
export class DeleteDialogComponent {
	isSubmitting: boolean = false;
	constructor(public dialogRef: MatDialogRef<DeleteDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: MaterialTracking, public _mat: MaterialTrackingService, private toastr: ToastrService) {}
	onNoClick(): void {
		this.dialogRef.close();
	}
	confirmDelete(): void {
		this._mat.delete(this.data.id).subscribe({
			next: (res) => {
				this.isSubmitting = true;
				this.dialogRef.close({data: res});
			},
			error: (e) => {
				this.isSubmitting = false;
				this.toastr.error(e.erorr.message, 'an error occurred');
			},
			complete: () => {
				this.isSubmitting = false;
			},
		});
	}
}
