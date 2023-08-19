import { HttpClient, HttpEvent, HttpHeaders } from "@angular/common/http";
import { environment } from "src/environments/environment";
import { Response } from "../interfaces/Iresponse";
import { BehaviorSubject, Observable } from "rxjs";
export abstract class GenericService<Tin> {
  loadingData: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);

  get isLoading(): boolean {
    return this.loadingData.value;
  }
  _emptyResponse: Response = {
    body: [],
    message: '',
    status: true,
    totalCount: 0,
  };
  dataChange: BehaviorSubject<Response> = new BehaviorSubject<Response>(this._emptyResponse);

  get data(): Response {
    return this.dataChange.value ?? this._emptyResponse;
  }

  private dialogData: any;

  get DialogData() {
    return this.dialogData;
  }
  set DialogData(value: any) {
    this.dialogData = value;
  }

  constructor(public http: HttpClient, private controller: string) {}

  uri: string = `${environment.apiUrl}${this.controller}`;
  headers = new HttpHeaders({ 'Content-Type': 'application/json' });

  getAll = () => this.http.get<Response>(`${this.uri}`, { headers: this.headers });

  add = (model: Tin) => this.http.post<Response>(`${this.uri}`, model, { headers: this.headers });

  addFormData = (model: Tin, selectedFile?: File | null, formKey?: string) => {
    const formData = new FormData();
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    this.appendNestedObjectToFormData(formData, model);
    if (selectedFile && formKey) formData.append(formKey, selectedFile);
    return this.http.post(`${this.uri}/FromForm`, formData, { headers, reportProgress: true, observe: 'events' });
  };

  // GetById = (id: string | number) => this.http.get<Response>(`${this.uri}/GetById`, { headers: this.headers, params: { id: id } });
  GetById = (id: string | number) => this.http.get<Response>(`${this.uri}/${id}`, { headers: this.headers });

  update = (id: string | number, model: Tin) => this.http.put<Response>(`${this.uri}`, { ...model, id }, { headers: this.headers });

  updateFormData = (model: Tin, selectedFile?: File | null, formKey?: string) => {
    const formData = new FormData();
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    this.appendNestedObjectToFormData(formData, model);
    if (selectedFile && formKey) formData.append(formKey, selectedFile);
    return this.http.put(`${this.uri}/FromForm`, formData, { headers, reportProgress: true, observe: 'events' });
  };

  delete = (id: string | number) => this.http.delete<Response>(`${this.uri}`, { headers: this.headers, params: { id: id } });

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
