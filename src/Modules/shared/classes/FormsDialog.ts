import { EventEmitter, HostListener, Injectable, Output } from "@angular/core";
import { MatDialogRef } from "@angular/material/dialog";
import { DialogServiceService } from "../services/dialog-service.service";
import { TranslateService } from "@ngx-translate/core";
import { GenericService } from "../services/genericCRUD.service";
import { Observer, Subscription } from "rxjs";
import { Response } from "../interfaces/Iresponse";
import { ToastrService } from "ngx-toastr";
import { FormGroup } from "@angular/forms";
@Injectable()
export class FormsDialogCommonFunctionality {
	subscriptions: Subscription[] = [];
	Form!: FormGroup;
	isSubmitting: boolean = false;
	constructor(public matDialogRef: MatDialogRef<any>, public translate: TranslateService, public service: GenericService<any>, public toastr: ToastrService) {}

	onNoClick = () => this.matDialogRef.close();

	addAndUpdateObserver(): Observer<Response> {
		return {
			next: (res) => {
				this.service.DialogData = res.body;
				this.matDialogRef.close({ data: res });
			},
			error: (e) => {
				this.isSubmitting = false;
				let res: Response = e.error ?? e;
				this.toastr.error(res.message);
			},
			complete: () => {
				this.isSubmitting = false;
			},
		};
	}

	public add = (values: any) => this.subscriptions.push(this.service.add(values).subscribe(this.addAndUpdateObserver()));

	public update = (id: number | string, values: any) => this.subscriptions.push(this.service.update(id, values).subscribe(this.addAndUpdateObserver()));

	ngOnDestroy = () => this.subscriptions.forEach((s) => s.unsubscribe());
}
