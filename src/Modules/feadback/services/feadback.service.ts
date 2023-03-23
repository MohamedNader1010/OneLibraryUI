import {Injectable} from '@angular/core';
import {GenericService} from 'src/Modules/shared/services/genericCRUD.service';
import {Feadback} from './../interfaces/feadback';
import {Response} from './../../shared/interfaces/Iresponse';
import {HttpClient} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
import {BehaviorSubject} from 'rxjs';
@Injectable({
	providedIn: 'root',
})
export class FeadbackService extends GenericService<Feadback, Response> {
	constructor(http: HttpClient, private toastr: ToastrService) {
		super(http, 'ClientFeedback');
	}

	loadingData: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

	get loading(): boolean {
		return this.loadingData.value;
	}

	dataChange: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

	get data(): any[] {
		return this.dataChange.value ?? [];
	}

	dialogData: any;

	get DialogData() {
		return this.dialogData;
	}

	getAllClientFeedbacks() {
		this.http.get<Response>(this.uri).subscribe({
			next: (data: Response) => {
				this.loadingData.next(true);
				this.dataChange.next(data.body);
			},
			error: (e) => {
				this.loadingData.next(false);
				let res: Response = e.error ?? e;
				this.toastr.error(res.message);
			},
			complete: () => this.loadingData.next(false),
		});
	}
}
