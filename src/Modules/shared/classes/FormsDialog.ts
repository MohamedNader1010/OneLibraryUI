import {EventEmitter, HostListener, Injectable, Output} from '@angular/core';
import {MatDialogRef} from '@angular/material/dialog';
import {DialogServiceService} from '../services/dialog-service.service';
import {TranslateService} from '@ngx-translate/core';
import {GenericService} from '../services/genericCRUD.service';
import {Subscription} from 'rxjs';
import {Response} from '../interfaces/Iresponse';
import {ToastrService} from 'ngx-toastr';
@Injectable()
export class FormsDialogCommonFunctionality {
	subscriptions: Subscription[] = [];
	isSubmitting: boolean = false;
	@HostListener('window:beforeunload', ['$event'])
	unloadNotification($event: any) {}
	@Output() onClose = new EventEmitter();
	constructor(public dRef: MatDialogRef<any>, public dService: DialogServiceService, public translate: TranslateService, public service: GenericService<any>, public toastr: ToastrService) {}
	public back = () => {
		this.closeAllOpenedDialogs();
	};
	private closeAllOpenedDialogs() {
		this.dRef.close();
		this.dService.closeDialog();
		this.onClose.emit();
	}

	public add(values: any) {
		this.subscriptions.push(
			this.service.add(values).subscribe({
				next: (res) => {
					this.service.dialogData = res.body;
					this.dRef.close({data: res});
				},
				error: (e) => {
					this.isSubmitting = false;
					let res: Response = e.error ?? e;
					this.toastr.error(res.message);
				},
				complete: () => {
					this.isSubmitting = false;
				},
			})
		);
	}
	public update(id: number | string, values: any) {
		this.subscriptions.push(
			this.service.update(id, values).subscribe({
				next: (res) => {
					this.service.dialogData = res.body;
					this.dRef.close({data: res});
				},
				error: (e) => {
					this.isSubmitting = false;
					let res: Response = e.error ?? e;
					this.toastr.error(res.message);
				},
				complete: () => {
					this.isSubmitting = false;
				},
			})
		);
	}

	ngOnDestroy() {
		this.subscriptions.forEach((s) => s.unsubscribe());
	}
}
