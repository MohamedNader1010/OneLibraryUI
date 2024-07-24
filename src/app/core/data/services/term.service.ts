import { Injectable } from '@angular/core';
import { Term } from '../models/term/ITerm';
import { BaseHttpClient } from '../../../shared/classes/base-http-client.abstract';
import { BACKEND_APIs } from '../apis/backend-apis';

@Injectable({
  providedIn: 'root',
})
export class TermService extends BaseHttpClient {
  getAll = () => this.httpClient.get<Term[]>(BACKEND_APIs.term);
}
