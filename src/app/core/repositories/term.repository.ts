import { Injectable } from '@angular/core';
import { BaseApiRepository } from './common/base-api.repository';
import { BACKEND_APIs } from '../apis/backend-apis';
import { IApiResponseT } from '../Common/models/response/api-response-t.interface';
import { Observable } from 'rxjs';
import { ITermDTO } from '../models/Terms/dtos/term.interface';

@Injectable({ providedIn: 'root' })
export class TermRepository extends BaseApiRepository {
    getTerms = (): Observable<IApiResponseT<ITermDTO[]>> => this.get<IApiResponseT<ITermDTO[]>>(BACKEND_APIs.terms.root);
}
