import {ErrorHandler, Injectable} from '@angular/core';
import {ToastrService} from 'ngx-toastr';

@Injectable()
export class GlobalErrorHandler implements ErrorHandler {
	// constructor(private toastr: ToastrService) {}
	handleError(error: any): void {
		console.log('handler', error);
		// this.toastr.error(error);
	}
}
