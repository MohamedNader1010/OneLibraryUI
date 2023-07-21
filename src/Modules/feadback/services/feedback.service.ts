import {Injectable} from '@angular/core';
import {GenericService} from 'src/Modules/shared/services/genericCRUD.service';
import {Feedback} from '../interfaces/feedback';
import {Response} from '../../shared/interfaces/Iresponse';
import {HttpClient} from '@angular/common/http';
import {ToastrService} from 'ngx-toastr';
@Injectable({
	providedIn: 'root',
})
export class FeedbackService extends GenericService<Feedback> {
	constructor(http: HttpClient, public override toastr: ToastrService) {
		super(http, 'ClientFeedback',toastr);
	}

	getAllClientFeedbacks() {
		this.loadingData.next(true);
		this.http.get<Response>(this.uri).subscribe({
			next: (data: Response) => {
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
