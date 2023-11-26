import { Injectable } from '@angular/core';
import { GenericService } from 'src/app/shared/services/genericCRUD.service';
import { Feedback } from '../models/feedback.model';
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
