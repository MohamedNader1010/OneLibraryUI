import { Injectable } from '@angular/core';
import { BaseApiRepository } from './common/base-api.repository';
import { Observable } from 'rxjs';
import { BACKEND_APIs } from '../apis/backend-apis';
import { IApiResponseT } from '../Common/models/response/api-response-t.interface';
import { IClientFeedbackDTO } from '../models/ClientFeedbacks/dtos/client-feedback-dto.interface';
import { IGetAllClientFeedbacksQuery } from '../models/ClientFeedbacks/queries/get-all-client-feedbacks-query.interface';
import { ICreateClientFeedbackCommand } from '../models/ClientFeedbacks/commands/create-client-feedback-command.interface';
import { IUpdateClientFeedbackCommand } from '../models/ClientFeedbacks/commands/update-client-feedback-command.interface';

@Injectable({ providedIn: 'root' })
export class FeedbackRepository extends BaseApiRepository {
    getAll = (query: IGetAllClientFeedbacksQuery): Observable<IApiResponseT<IClientFeedbackDTO[]>> =>
        this.get<IApiResponseT<IClientFeedbackDTO[]>>(BACKEND_APIs.feedbacks.root);

    add = (command: ICreateClientFeedbackCommand): Observable<IApiResponseT<any>> =>
        this.post<IApiResponseT<any>>(BACKEND_APIs.feedbacks.root, command);

    edit = (command: IUpdateClientFeedbackCommand): Observable<IApiResponseT<any>> =>
        this.put<IApiResponseT<any>>(BACKEND_APIs.feedbacks.root, command);
}
