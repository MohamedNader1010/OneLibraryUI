import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { ToastrService } from 'ngx-toastr';
import { Response } from './../../../shared/interfaces/Iresponse';
import { GenericService } from '../../services/genericCRUD.service';
import { TranslateService } from '@ngx-translate/core';
import { DeleteDialogData } from '../../interfaces/deleteDialogData';
import { MaterialService } from 'src/Modules/material/services/material.service';
import { ServiceFactory } from '../../classes/ServiceFactory';


@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css']
})
export class DeleteDialogComponent {
  isSubmitting: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DeleteDialogData,
    private serviceFactory: ServiceFactory,
    private toastr: ToastrService,
    private translate: TranslateService
  ) { }
  onNoClick(): void {
    this.dialogRef.close();
  }
  confirmDelete(): void {
    const service: GenericService<any> = this.serviceFactory.getService(this.data.componentName);
    service.delete(this.data.row.id).subscribe({
      next: (res) => {
        this.isSubmitting = true;
        this.dialogRef.close({ data: res });
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
  public getTranslatedString(key: any): string {

    return this.translate.instant(`keys.${this.data.componentName}.` + key.toString())
  }
}
