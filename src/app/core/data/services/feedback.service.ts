import { Injectable } from '@angular/core';
import { BaseHttpClient } from '../../../shared/classes/base-http-client.abstract';
import { ResponseDto } from '../../../shared/interfaces/IResponse.dto';
import { BACKEND_APIs } from '../apis/backend-apis';
import { Feedback } from '../models/feedback/feedback';
@Injectable({
  providedIn: 'root',
})
export class FeedbackService extends BaseHttpClient {
  getAll = () => this.httpClient.get<ResponseDto>(`${BACKEND_APIs.feedback}`, { headers: this.headers });

  getAllDataForTable() {
    this.loadingData.next(true);
    this.getAll().subscribe({
      next: (data: ResponseDto) => {
        this.dataChange.next(data);
      },
      error: () => this.loadingData.next(false),
      complete: () => this.loadingData.next(false),
    });
  }

  add = (model: Feedback) => this.httpClient.post<ResponseDto>(BACKEND_APIs.feedback, model, { headers: this.headers });

  update = (id: number, model: Feedback) => this.httpClient.put<ResponseDto>(BACKEND_APIs.feedback, { ...model, id }, { headers: this.headers });
}
