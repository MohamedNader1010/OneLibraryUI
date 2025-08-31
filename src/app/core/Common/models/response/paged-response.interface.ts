import { IApiResponseT } from './api-response-t.interface';
import { IPaginationMetadata } from './pagination-metadata.interface';

export interface IPagedResponse<T> extends IApiResponseT<T[]> {
  metadata: IPaginationMetadata;
}
