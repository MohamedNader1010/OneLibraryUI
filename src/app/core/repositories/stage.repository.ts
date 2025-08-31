import { Injectable } from '@angular/core';
import { BaseApiRepository } from './common/base-api.repository';
import { BACKEND_APIs } from '../apis/backend-apis';
import { IApiResponseT } from '../Common/models/response/api-response-t.interface';
import { Observable } from 'rxjs';
import { IStageDTO } from '../models/Stages/dtos/stage-dto.interface';

@Injectable({ providedIn: 'root' })
export class StageRepository extends BaseApiRepository {
    getStages = (): Observable<IApiResponseT<IStageDTO[]>> => this.get<IApiResponseT<IStageDTO[]>>(BACKEND_APIs.stages.root);
}
