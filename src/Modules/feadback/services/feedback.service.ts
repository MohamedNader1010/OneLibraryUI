import {Injectable} from '@angular/core';
import {GenericService} from 'src/Modules/shared/services/genericCRUD.service';
import { Feedback } from '../interfaces/feedback';
import { HttpClient } from '@angular/common/http';
import { ToastrService } from 'ngx-toastr';
@Injectable({
  providedIn: 'root',
})
export class FeedbackService extends GenericService<Feedback> {
  constructor(http: HttpClient, toastrService: ToastrService) {
    super(http, 'ClientFeedback', toastrService);
  }
}
