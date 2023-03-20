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
export class AttendanceService extends GenericService<Attendance, Response> {
	constructor(http: HttpClient, private toastr: ToastrService) {
		super(http, 'Attendance');
	}

	dataChange: BehaviorSubject<any[]> = new BehaviorSubject<any[]>([]);

	loadingData: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
	checkedIn: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

	get loading(): boolean {
		return this.loadingData.value;
	}

	get data(): any[] {
		return this.dataChange.value ?? [];
	}

	dialogData: any;

	getDialogData() {
		return this.dialogData;
	}

	getAllAttendance() {
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

	getEmpAttendance = (id: string, from: Date, to: Date) =>
		this.http.get<Response>(`${this.uri}/GetEmpAttendance`, {headers: this.headers, params: {Id: id, from: from.toDateString(), to: to.toDateString()}});

	getByDate = (from: Date, to: Date) => this.http.get<Response>(`${this.uri}/GetByDate`, {headers: this.headers, params: {from: from.toDateString(), to: to.toDateString()}});

	checkIn = () => this.http.post<Response>(`${this.uri}/CheckIn`, {headers: this.headers});

	checkOut = () => this.http.post<Response>(`${this.uri}/CheckOut`, {headers: this.headers});
}
