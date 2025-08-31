import { HttpHeaders, HttpContext, HttpParams } from '@angular/common/http';
import { BACKEND_APIs } from '../apis/backend-apis';
import { FormArray, FormControl, FormGroup } from '@angular/forms';

// Utility: resolve value or function return type
type ResolvedApiValue<T> = T extends (...args: any[]) => infer R ? R : T extends string ? T : never;

// Recursive extractor: goes deep and collects all leaf values
type ExtractApiValues<T> = {
    [K in keyof T]: T[K] extends (...args: any[]) => string
        ? ResolvedApiValue<T[K]>
        : T[K] extends string
        ? T[K]
        : ExtractApiValues<T[K]>;
}[keyof T];

export type ApiUrl = ExtractApiValues<typeof BACKEND_APIs>;

export type options = {
    headers?:
        | HttpHeaders
        | {
              [header: string]: string | string[];
          };
    context?: HttpContext;
    params?:
        | HttpParams
        | {
              [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
          };
    observe?: any;
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
};

export type httpRequestOptions = {
    headers?:
        | HttpHeaders
        | {
              [header: string]: string | string[];
          };
    context?: HttpContext;
    params?:
        | HttpParams
        | {
              [param: string]: string | number | boolean | ReadonlyArray<string | number | boolean>;
          };
    observe?: 'events';
    reportProgress?: boolean;
    responseType?: 'json';
    withCredentials?: boolean;
};

// Prevent distribution over union types by wrapping types in tuples
type ControlType<T> = [T] extends [(infer U)[]]
    ? TypedFormArray<U>
    : [T] extends [object]
    ? [T] extends [Date]
        ? FormControl<T>
        : TypedFormGroup<T>
    : FormControl<T>;

type PropertyControl<T, K extends keyof T> = undefined extends T[K] ? FormControl<NonNullable<T[K]> | null> : ControlType<T[K]>;

export type TypedFormGroup<T> = FormGroup<{ [K in keyof T]-?: PropertyControl<T, K> }>;

export type TypedFormArray<T> = FormArray<ControlType<T>>;
