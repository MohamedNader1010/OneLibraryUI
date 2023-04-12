import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Material} from '../interfaces/Imaterial';
import {GenericService} from 'src/Modules/shared/services/genericCRUD.service';
import {ToastrService} from 'ngx-toastr';
import {BehaviorSubject} from 'rxjs';
import {Response} from './../../shared/interfaces/Iresponse';

@Injectable({
	providedIn: 'root',
})
export class MaterialService extends GenericService<Material> {
	constructor(http: HttpClient, private toastr: ToastrService) {
		super(http, 'Material');
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

	getAllMaterials() {
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
