import { ToastrService, ToastrModule } from 'ngx-toastr';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AlertServiceService {

  constructor(private toastrService: ToastrService) { }

  onSuccess(message: string, title: string) {
    return this.toastrService.success(message, title);
  }
  onError(message: string, title: string) {
    return this.toastrService.error(message, title);
  }
  onWarning(message: string, title: string) {
    return this.toastrService.warning(message, title);
  }
  info(message: string, title: string) {
    return this.toastrService.info(message, title);
  }

}
