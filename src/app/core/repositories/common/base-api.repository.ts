import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { ApiUrl } from '../../types/common.types';
import { IBaseFilterParams } from '../../Common/models/request/base-filter-params.model';
import { IPaginationRequest } from '../../Common/models/request/pagination-request.model';
import { Subject, Observable, shareReplay, takeUntil } from 'rxjs';

export abstract class BaseApiRepository {
    httpClient = inject(HttpClient);
    toastrService = inject(ToastrService);

    unsubscribe$ = new Subject<void>();
    jsonHttpHeaders = new HttpHeaders({ 'Content-Type': 'application/json' });

    protected get = <TRes>(url: ApiUrl, params?: HttpParams): Observable<TRes> =>
        this.httpClient
            .get<TRes>(url, { headers: this.jsonHttpHeaders, params })
            .pipe(shareReplay(), takeUntil(this.unsubscribe$));

    protected getPaginated = <TRes>(url: ApiUrl, paginationRequest: IPaginationRequest): Observable<TRes> => {
        return this.httpClient
            .get<TRes>(url, { headers: this.jsonHttpHeaders, params: this.getHttpParams(paginationRequest) })
            .pipe(shareReplay(), takeUntil(this.unsubscribe$));
    };

    protected getStream(url: ApiUrl) {
        return this.httpClient
            .get(url, {
                headers: new HttpHeaders({ 'Content-Type': 'application/pdf' }),
                responseType: 'blob',
                observe: 'events',
                reportProgress: true
            })
            .pipe(shareReplay(), takeUntil(this.unsubscribe$));
    }

    protected post = <TRes, TReq = any>(url: ApiUrl, model?: TReq): Observable<TRes> =>
        this.httpClient
            .post<TRes>(url, model, { headers: this.jsonHttpHeaders })
            .pipe(shareReplay(), takeUntil(this.unsubscribe$));

    protected put = <TRes, TReq = any>(url: ApiUrl, model: TReq): Observable<TRes> => {
        return this.httpClient
            .put<TRes>(url, model, { headers: this.jsonHttpHeaders })
            .pipe(shareReplay(), takeUntil(this.unsubscribe$));
    };

    protected delete = <TRes>(url: ApiUrl, body?: any): Observable<TRes> =>
        this.httpClient
            .delete<TRes>(url, { headers: this.jsonHttpHeaders, body: body })
            .pipe(shareReplay(), takeUntil(this.unsubscribe$));

    protected postForm = <TRes, TReq>(url: ApiUrl, model: TReq) =>
        this.httpClient
            .post<TRes>(url, this.#objectToFormData(model), { reportProgress: true, observe: 'events' })
            .pipe(shareReplay(), takeUntil(this.unsubscribe$));

    protected putForm = <TRes, TReq = any>(url: ApiUrl, model: TReq) =>
        this.httpClient
            .put<TRes>(url, this.#objectToFormData(model), { reportProgress: true, observe: 'events' })
            .pipe(shareReplay(), takeUntil(this.unsubscribe$));

    #objectToFormData(obj: any, form?: FormData, parentKey?: string): FormData {
        const formData = form || new FormData();

        if (obj === null || obj === undefined) return formData;

        if (typeof obj === 'object' && !(obj instanceof Date) && !(obj instanceof File)) {
            Object.entries(obj).forEach(([key, value]) => {
                const fullKey = parentKey ? `${parentKey}[${key}]` : key;
                this.#objectToFormData(value, formData, fullKey);
            });
        } else {
            formData.append(parentKey!, obj);
        }

        return formData;
    }

    getHttpParams(paginationRequest: IPaginationRequest): HttpParams {
        const { filters = [], ...rest } = paginationRequest;
        let params = new HttpParams({ fromObject: rest });
        filters.forEach((filter: IBaseFilterParams, index: number) => {
            params = params
                .append(`Filters[${index}].key`, filter.key)
                .append(`Filters[${index}].value`, filter.value.toString());
        });
        return params;
    }

    unsubscribe() {
        this.unsubscribe$.next();
        this.unsubscribe$.complete();
    }
}
