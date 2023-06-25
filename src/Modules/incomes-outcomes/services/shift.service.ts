import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {GenericService} from 'src/Modules/shared/services/genericCRUD.service';
import {Response} from './../../shared/interfaces/Iresponse';
import {ToastrService} from 'ngx-toastr';
import { Shift } from "../interFaces/Ishift"
import { CloseAndStartShift } from "../interfaces/IcloseAndStartShift"

@Injectable({
	providedIn: 'root',
})
export class ShiftService extends GenericService<Shift> {
	constructor(http: HttpClient, private toastr: ToastrService) {
		super(http, 'Shift');
	}

	getAllShifts() {
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

	closeAndStartNewShift = (model: CloseAndStartShift) => this.http.post<Response>(`${this.uri}`, model, { headers: this.headers });

	GetCurrentShift = () => this.http.get<Response>(`${this.uri}/CurrentShift`, { headers: this.headers });

	GetLastGuarante = () => this.http.get<Response>(`${this.uri}/LastGuarante`, { headers: this.headers });
}
