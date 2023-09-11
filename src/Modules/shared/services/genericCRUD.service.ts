import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { ResponseDto } from '../interfaces/Iresponse';
import { BehaviorSubject } from 'rxjs';
import { ToastrService } from 'ngx-toastr';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export abstract class GenericService<Tin> {
  loadingData: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

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

  private _dialogData: any;

  get DialogData() {
    return this._dialogData;
  }
  set DialogData(value: any) {
    this._dialogData = value;
  }

  constructor(public http: HttpClient, private _controller: string, public _toastrService: ToastrService) {}

  uri: string = `${environment.apiUrl}${this._controller}`;
  headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  getAll = () => this.http.get<ResponseDto>(`${this.uri}`, { headers: this.headers });

  getAllDataForTable() {
    this.loadingData.next(true);
    this.http.get<ResponseDto>(this.uri).subscribe({
      next: (data: ResponseDto) => {
        this.dataChange.next(data);
      },
      error: (e) => {
        this.loadingData.next(false);
        let res: ResponseDto = e.error ?? e;
        this._toastrService.error(res.message);
      },
      complete: () => this.loadingData.next(false),
    });
  }

  add = (model: Tin) => this.http.post<ResponseDto>(`${this.uri}`, model, { headers: this.headers });

  addFormData = (model: Tin, selectedFile?: File | null, formKey?: string) => {
    const formData = new FormData();
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    this.appendNestedObjectToFormData(formData, model);
    if (selectedFile && formKey) formData.append(formKey, selectedFile);
    return this.http.post(`${this.uri}/FromForm`, formData, { headers, reportProgress: true, observe: 'events' });
  };

  // GetById = (id: string | number) => this.http.get<ResponseDto>(`${this.uri}/GetById`, { headers: this.headers, params: { id: id } });
  GetById = (id: string | number) => this.http.get<ResponseDto>(`${this.uri}/${id}`, { headers: this.headers });

  update = (id: string | number, model: Tin) => this.http.put<ResponseDto>(`${this.uri}`, { ...model, id }, { headers: this.headers });

  updateFormData = (model: Tin, selectedFile?: File | null, formKey?: string) => {
    const formData = new FormData();
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    this.appendNestedObjectToFormData(formData, model);
    if (selectedFile && formKey) formData.append(formKey, selectedFile);
    return this.http.put(`${this.uri}/FromForm`, formData, { headers, reportProgress: true, observe: 'events' });
  };

  delete = (id: string | number) => this.http.delete<ResponseDto>(`${this.uri}`, { headers: this.headers, params: { id: id } });

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
