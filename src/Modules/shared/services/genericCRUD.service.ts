import { HttpClient, HttpHeaders } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { BehaviorSubject, finalize, tap } from 'rxjs';
import { ResponseDto } from '../interfaces/IResponse.dto';
import { PagingCriteria } from '../interfaces/pagingCriteria';

@Injectable({
  providedIn: 'root',
})
export abstract class GenericService<Tin> {
  httpClient = inject(HttpClient);
  controller!: string;
  uri!: string;
  toastrService = inject(ToastrService);
  loadingData: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  get isLoading(): boolean {
    return this.loadingData.value;
  }
  _emptyResponse: ResponseDto = {
    body: [],
    message: '',
    status: true,
    totalCount: 0,
  };
  dataChange: BehaviorSubject<ResponseDto> = new BehaviorSubject<ResponseDto>(this._emptyResponse);

  get data(): ResponseDto {
    return this.dataChange.value ?? this._emptyResponse;
  }

  getAll = () => this.httpClient.get<ResponseDto>(`${this.uri}`, { headers: this.headers });

  getAllDataForTable() {
    this.loadingData.next(true);
    this.httpClient.get<ResponseDto>(this.uri).subscribe({
      next: (data: ResponseDto) => {
        this.dataChange.next(data);
      },
      error: () => this.loadingData.next(false),
      complete: () => this.loadingData.next(false),
    });
  }

  getPagedData(pagingCriteria: PagingCriteria) {
    this.loadingData.next(true);
    return this.httpClient.post<ResponseDto>(`${this.uri}/GetAllPaginated`, pagingCriteria).pipe(
      tap((data: ResponseDto) => {
        this.dataChange.next(data);
      }),
      finalize(() => this.loadingData.next(false)),
    );
  }

  add = (model: Tin) => this.httpClient.post<ResponseDto>(`${this.uri}`, model, { headers: this.headers });

  addFormData = (model: Tin, selectedFile?: File | null, formKey?: string) => {
    const formData = new FormData();
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    this.appendNestedObjectToFormData(formData, model);
    if (selectedFile && formKey) formData.append(formKey, selectedFile);
    return this.httpClient.post(`${this.uri}/FromForm`, formData, { headers, reportProgress: true, observe: 'events' });
  };

  GetById = (id: string | number) => this.httpClient.get<ResponseDto>(`${this.uri}/${id}`, { headers: this.headers });

  update = (id: string | number, model: Tin) => this.httpClient.put<ResponseDto>(`${this.uri}`, { ...model, id }, { headers: this.headers });

  updateFormData = (model: Tin, selectedFile?: File | null, formKey?: string) => {
    const formData = new FormData();
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    this.appendNestedObjectToFormData(formData, model);
    if (selectedFile && formKey) formData.append(formKey, selectedFile);
    return this.httpClient.put(`${this.uri}/FromForm`, formData, { headers, reportProgress: true, observe: 'events' });
  };

  delete = (id: string | number) => this.httpClient.delete<ResponseDto>(`${this.uri}`, { headers: this.headers, params: { id: id } });

  appendNestedObjectToFormData(formData: FormData, object: any) {
    for (const key in object) {
      if (object.hasOwnProperty(key)) {
        const value = object[key];
        if (value !== null) {
          if (typeof value === 'object') {
            for (let i = 0; i < value.length; i++) {
              const childObject = value[i];
              for (const childKey in childObject) {
                if (childObject.hasOwnProperty(childKey)) {
                  const childValue = childObject[childKey];
                  if (childValue !== null) {
                    formData.append(`${key}[${i}].${childKey}`, childValue);
                  }
                }
              }
            }
          } else {
            formData.append(key, value);
          }
        }
      }
    }
  }
}
