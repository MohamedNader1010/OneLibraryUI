import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ToastrService} from 'ngx-toastr';
import {Response} from './../../../shared/interfaces/Iresponse';
import {MaterialService} from '../../services/material.service';
import {Material} from '../../interfaces/Imaterial';

@Component({
	selector: 'app-delete.dialog',
	templateUrl: './delete.dialog.html',
	styleUrls: ['./delete.dialog.css'],
})
export class DeleteDialogComponent {
	isSubmitting: boolean = false;
	constructor(public dialogRef: MatDialogRef<DeleteDialogComponent>, @Inject(MAT_DIALOG_DATA) public data: Material, public dataService: MaterialService, private toastr: ToastrService) {}
	onNoClick(): void {
		this.dialogRef.close();
	}
	confirmDelete(): void {
		this.dataService.delete(this.data.id).subscribe({
			next: (res) => {
				this.isSubmitting = true;
				this.dialogRef.close({data: res});
			},
			error: (e) => {
				this.isSubmitting = false;
				let res: Response = e.error ?? e;
				this.toastr.error(res.message);
			},
			complete: () => {
				this.isSubmitting = false;
			},
		});
	}
}
