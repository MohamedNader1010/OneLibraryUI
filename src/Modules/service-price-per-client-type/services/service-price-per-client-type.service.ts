import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {ServicePricePerClientType} from '../Interfaces/ServicePricePerClientType';
import {ToastrService} from 'ngx-toastr';
import {GenericService} from 'src/Modules/shared/services/genericCRUD.service';
import {Response} from 'src/Modules/shared/interfaces/Iresponse';

@Injectable({
	providedIn: 'root',
})
export class ServicePricePerClientTypeService extends GenericService<ServicePricePerClientType> {
	constructor(http: HttpClient, private toastr: ToastrService) {
		super(http, 'ServicePricePerClientType');
	}

	getAllServicePrices() {
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

	getPrice = (clientTypeId: number, serviceId: number) => this.http.get<Response>(`${this.uri}/GetServicePricePerClientType?ClientTypeId=${clientTypeId}&ServiceId=${serviceId}`);

	deleteServicePrices = (ids: number[]) => this.http.delete<Response>(`${this.uri}DeleteServicePrices`, {body: ids});
}
