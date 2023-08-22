import { HttpClient } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { ToastrService } from "ngx-toastr";
import { GenericService } from "../../shared/services/genericCRUD.service";
import { Response } from "../../shared/interfaces/Iresponse";
import { Bank } from "../interfaces/Ibank";

@Injectable({
  providedIn: 'root'
})
export class BankService extends GenericService<Bank> {
	constructor(http: HttpClient, private toastr: ToastrService) {
		super(http, 'Bank');
	}
	getAllBankTransactions(id: number) {
		this.loadingData.next(true);
    this.GetById(id).subscribe({
			next: (data: Response) => {
				this.dataChange.next({ body: (data.body as Bank)?.transactions } as Response);
			},
			error: (e) => {
				this.loadingData.next(false);
				let res: Response = e.error ?? e;
				this.toastr.error(res.message);
			},
			complete: () => this.loadingData.next(false),
		});
	}

	SetStartingPalance = (model: Bank) => this.http.post<Response>(`${this.uri}/SetStartingPalance`,model, { headers: this.headers });
}
