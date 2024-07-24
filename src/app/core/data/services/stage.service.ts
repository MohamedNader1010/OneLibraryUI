import { Injectable } from '@angular/core';
import { Stage } from '../models/stage/IStage';
import { BACKEND_APIs } from '../apis/backend-apis';
import { BaseHttpClient } from '../../../shared/classes/base-http-client.abstract';

@Injectable({
  providedIn: 'root',
})
export class StageService extends BaseHttpClient {
  getAll = () => this.httpClient.get<Stage[]>(BACKEND_APIs.stage);
}
