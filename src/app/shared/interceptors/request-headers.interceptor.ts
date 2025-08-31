import { HttpEvent, HttpHandler, HttpInterceptor, HttpRequest } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { BACKEND_APIs } from '../../core/apis/backend-apis';
import { HeadersKeysConstants } from '../constants/headers-keys.constants';
import { LocalStorageKeys } from '../constants/local-storage-keys.constants';

@Injectable()
export class RequestHeadersInterceptor implements HttpInterceptor {
    intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
        const isAssetsRequest = request.url.includes('assets');
        const isFiscalYearCurrentRequest = request.url.includes(BACKEND_APIs.fiscalYears.current());
        const isAuthorizationRequest = request.url.includes(BACKEND_APIs.authorization.root);

        if (isAssetsRequest || isFiscalYearCurrentRequest || isAuthorizationRequest) {
            return next.handle(request);
        }

        let shiftId = localStorage.getItem(LocalStorageKeys.SHIFT_ID);
        if (shiftId) request = request.clone({ headers: request.headers.set(HeadersKeysConstants.SHIFT_ID_HEADER, shiftId) });

        let fiscalYearId = localStorage.getItem(LocalStorageKeys.FISCAL_YEAR_ID);
        if (fiscalYearId) request = request.clone({ headers: request.headers.set(HeadersKeysConstants.FISCAL_YEAR_ID_HEADER, fiscalYearId) });

        let branchId = localStorage.getItem(LocalStorageKeys.BRANCH_ID);
        if (branchId) request = request.clone({ headers: request.headers.set(HeadersKeysConstants.BRANCH_ID_HEADER, branchId) });

        return next.handle(request);
    }
}
