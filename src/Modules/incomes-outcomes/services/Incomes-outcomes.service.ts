import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {GenericService} from 'src/Modules/shared/services/genericCRUD.service';
import {Response} from '../../shared/interfaces/Iresponse';
import { IncomeOutcome } from "../interFaces/Iincome-outcome";

@Injectable({
	providedIn: 'root',
})
export class IncomesOutcomesService extends GenericService<IncomeOutcome> {
	constructor(http: HttpClient, private toastr: ToastrService) {
		super(http, 'IncomeOutcome');
	}
	getAllIncomesOutcomes() {
		this.loadingData.next(true);
		this.http.get<Response>(this.uri).subscribe({
			next: (data: Response) => {
				this.dataChange.next(data);
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
