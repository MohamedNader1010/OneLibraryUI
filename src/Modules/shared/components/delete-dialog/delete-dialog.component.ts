import {Component, Inject} from '@angular/core';
import {MatDialogRef, MAT_DIALOG_DATA} from '@angular/material/dialog';
import {ToastrService} from 'ngx-toastr';
import { ResponseDto } from '../../interfaces/IResponse.dto';
import { GenericService } from '../../services/genericCRUD.service';
import { TranslateService } from '@ngx-translate/core';
import { DeleteDialogData } from '../../interfaces/deleteDialogData';
import { ServiceFactory } from '../../classes/ServiceFactory';

@Component({
  selector: 'app-delete-dialog',
  templateUrl: './delete-dialog.component.html',
  styleUrls: ['./delete-dialog.component.css'],
})
export class DeleteDialogComponent {
  isSubmitting: boolean = false;
  constructor(
    public dialogRef: MatDialogRef<DeleteDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DeleteDialogData,
    private _serviceFactoryService: ServiceFactory,
    private _toastrService: ToastrService,
    private _translateService: TranslateService,
  ) {}
  onNoClick(): void {
    this.dialogRef.close();
  }
  confirmDelete(): void {
    const service: GenericService<any> = this._serviceFactoryService.getService(this.data.componentName);
    service.delete(this.data.row.id).subscribe({
      next: (res: ResponseDto) => {
        this.isSubmitting = true;
        this.dialogRef.close({ data: res });
      },
      error: () => (this.isSubmitting = false),
      complete: () => {
        this.isSubmitting = false;
      },
    });
  }
  public getTranslatedString(key: any): string {
    return this._translateService.instant(`keys.${this.data.componentName}.` + key.toString());
  }
}
