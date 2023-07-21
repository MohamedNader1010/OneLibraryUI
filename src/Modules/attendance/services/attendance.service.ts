import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ToastrService} from 'ngx-toastr';
import {BehaviorSubject} from 'rxjs';
import {GenericService} from 'src/Modules/shared/services/genericCRUD.service';
import {Attendance} from '../interfaces/attendance';
import {Response} from './../../shared/interfaces/Iresponse';

@Injectable({
	providedIn: 'root',
})
export class AttendanceService extends GenericService<Attendance> {
	constructor(http: HttpClient, public override toastr: ToastrService) {
		super(http, 'Attendance', toastr);
	}

	checkedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

	getAllAttendance() {
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

	getEmpAttendance = (id: string, from: Date, to: Date) =>
		this.http.get<Response>(`${this.uri}/GetEmpAttendance`, {headers: this.headers, params: {Id: id, from: from.toDateString(), to: to.toDateString()}});

	getByDate = (from: Date, to: Date) => this.http.get<Response>(`${this.uri}/GetByDate`, {headers: this.headers, params: {from: from.toDateString(), to: to.toDateString()}});

	checkIn = () => this.http.post<Response>(`${this.uri}/CheckIn`, {headers: this.headers});

	checkOut = () => this.http.post<Response>(`${this.uri}/CheckOut`, {headers: this.headers});
}
