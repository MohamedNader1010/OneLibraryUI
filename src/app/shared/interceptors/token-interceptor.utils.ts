import { HttpRequest, HttpErrorResponse } from '@angular/common/http';

export function isRefreshTokenRequest(request: HttpRequest<any>): boolean {
    return request.url.includes('/refresh-token');
}

export function isLoginRequest(request: HttpRequest<any>): boolean {
    return request.url.includes('/login');
}

export function isLogoutRequest(request: HttpRequest<any>): boolean {
    return request.url.includes('/logout');
}

export function extractErrorInfo(error: HttpErrorResponse): { errorMessage: string; errorTitle: string } {
    const status = error.status ?? (error.error?.status as number | undefined);
    const payload = error.error;

    // Network layer / unreachable server
    if (status === 0) {
        return {
            errorMessage: 'Server is unreachable. Please check your connection.',
            errorTitle: 'Network Error'
        };
    }

    // Client-side error
    if (payload instanceof ErrorEvent) {
        return {
            errorMessage: payload.message || 'A client error occurred.',
            errorTitle: 'Client Error'
        };
    }

    // Plain string response
    if (typeof payload === 'string') {
        return { errorMessage: payload, errorTitle: titleByStatus(status) };
    }

    // Binary payloads (e.g., Blob from failed file downloads) - cannot parse synchronously here
    if (typeof Blob !== 'undefined' && payload instanceof Blob) {
        return {
            errorMessage: 'Unexpected error response from server.',
            errorTitle: titleByStatus(status)
        };
    }

    // Structured JSON
    if (payload && typeof payload === 'object') {
        // ASP.NET Core ValidationProblemDetails
        const errorsBag = (payload as any).errors || (payload as any).Errors;
        if (errorsBag && typeof errorsBag === 'object') {
            const aggregated = aggregateValidationErrors(errorsBag);
            return {
                errorMessage: aggregated || (payload.detail as string) || 'Validation failed.',
                errorTitle: (payload.title as string) || 'Validation Error'
            };
        }

        // RFC 7807 ProblemDetails
        if ((payload as any).title || (payload as any).detail || (payload as any).type) {
            return {
                errorMessage: ((payload as any).detail as string) || ((payload as any).title as string) || 'An error occurred.',
                errorTitle: ((payload as any).title as string) || titleByStatus(status)
            };
        }

        // Common custom shapes
        const message =
            (payload as any).message || (payload as any).Message || (payload as any).error || (payload as any).error_description;
        if (message) {
            return { errorMessage: String(message), errorTitle: titleByStatus(status) };
        }
    }

    // Generic fallbacks
    if (status && status >= 500) {
        return {
            errorMessage: 'Server error. Try again later.',
            errorTitle: 'Server Error'
        };
    }

    return {
        errorMessage: error.message || 'Unexpected error occurred.',
        errorTitle: titleByStatus(status)
    };
}

function aggregateValidationErrors(errorsBag: Record<string, string[] | string>): string {
    const parts: string[] = [];
    Object.keys(errorsBag || {}).forEach((key) => {
        const value = errorsBag[key];
        const messages = Array.isArray(value) ? value : [value];
        messages.filter(Boolean).forEach((msg) => parts.push(`${key}: ${msg}`));
    });
    return parts.join('\n');
}

function titleByStatus(status?: number): string {
    switch (status) {
        case 400:
            return 'Bad Request';
        case 401:
            return 'Unauthorized';
        case 403:
            return 'Forbidden';
        case 404:
            return 'Not Found';
        case 409:
            return 'Conflict';
        case 422:
            return 'Unprocessable Entity';
        case 429:
            return 'Too Many Requests';
        default:
            if (!status) return 'Error';
            return status >= 500 ? 'Server Error' : 'Error';
    }
}
