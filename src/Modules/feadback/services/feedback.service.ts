import { Injectable } from '@angular/core';
import { GenericService } from 'src/Modules/shared/services/genericCRUD.service';
import { Feedback } from '../interfaces/feedback';
import { environment } from '../../../environments/environment';
@Injectable({
  providedIn: 'root',
})
export class FeedbackService extends GenericService<Feedback> {
  override controller = 'ClientFeedback';
  override uri: string = `${environment.apiUrl}${this.controller}`;
}
