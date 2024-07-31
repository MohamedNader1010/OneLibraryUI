export interface IGenericResponseDto<T> {
  status: boolean;
  message: string;
  body: T;
}
