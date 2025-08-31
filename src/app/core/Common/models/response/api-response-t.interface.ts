import { IApiResponse } from './api-response.interface';

export interface IApiResponseT<T> extends IApiResponse {
    data: T;
    isSuccess?: boolean;
}
