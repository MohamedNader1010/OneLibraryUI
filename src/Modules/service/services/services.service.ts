import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Service} from '../interfaces/Iservice';
import {ToastrService} from 'ngx-toastr';
import {BehaviorSubject} from 'rxjs';
import {GenericService} from 'src/Modules/shared/services/genericCRUD.service';
import {Response} from './../../shared/interfaces/Iresponse';

@Injectable({
	providedIn: 'root',
})
export class ServicesService extends GenericService<Service, Response> {
	constructor(http: HttpClient, private toastr: ToastrService) {
		super(http, 'Service');
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

	getAllServices() {
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

	getPrice = (serviceId: number, clientTypeId: number) => this.http.get(`${this.uri}ServicePricePerClientType/GetServicePricePerClientType?ClientTypeId=${clientTypeId}&ServiceId=${serviceId}`);
}
