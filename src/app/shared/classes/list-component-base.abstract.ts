import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { IApiResponseT } from '../../core/Common/models/response/api-response-t.interface';
import { DataComponentBase } from './data-component-base.abstract';

@Injectable()
export abstract class ListComponentBase<T> extends DataComponentBase {
    abstract dataObservableFn(): Observable<IApiResponseT<T[]>>;
}
