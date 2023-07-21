import { HttpClient, HttpEvent, HttpHeaders, HttpParams } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Response } from '../interfaces/Iresponse';
import { BehaviorSubject, Observable, catchError, finalize, tap, throwError } from 'rxjs';
import { PaginationDto } from '../interfaces/paginationDto';
import { ToastrService } from 'ngx-toastr';
export abstract class GenericService<Tin> {
  loadingData: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false);
  _initialResponse: Response = {
    body: [],
    message: '',
    status: true,
    totalCount: 0,
  };
  get isLoading(): boolean {
    return this.loadingData.value;
  }

  dataChange: BehaviorSubject<Response> = new BehaviorSubject<Response>(this._initialResponse);

  get data(): Response {
    return this.dataChange.value ?? [];
  }

  dialogData: any;

  get DialogData() {
    return this.dialogData;
  }

  constructor(public http: HttpClient, private controller: string, public toastr: ToastrService) {}

  uri: string = `${environment.apiUrl}${this.controller}`;
  headers = new HttpHeaders({ 'Content-Type': 'application/json' });
  private generateHttpParams(pagingDto: PaginationDto): HttpParams {
    let httpParams = new HttpParams();

    httpParams = httpParams.set('pageIndex', pagingDto.pageIndex.toString());
    httpParams = httpParams.set('isDesc', pagingDto.isDesc.toString());
    httpParams = httpParams.set('keyWord', pagingDto.keyWord);
    httpParams = httpParams.set(
      'orderByPropertyName',
      pagingDto.orderByPropertyName
    );
    httpParams = httpParams.set('length', pagingDto.length.toString());

    return httpParams;
  }
  getOrderPerPage(pagingDto: PaginationDto): Observable<Response> {
	this.loadingData.next(true);
	const httpParams = this.generateHttpParams(pagingDto);
	return this.http.get<Response>(`${this.uri}/GetAllPagAsync`, {
	  headers: this.headers,
	  params: httpParams,
	}).pipe(
	  tap((data: Response) => {
		this.dataChange.next(data);
	  }),
	  catchError((error) => {
		this.loadingData.next(false);
		let res: Response = error.error ?? error;
		this.toastr.error(res.message);
		return throwError(error); 
	  }),
	  finalize(() => this.loadingData.next(false))
	);
  }
  getAll = () =>
    this.http.get<Response>(`${this.uri}`, { headers: this.headers });

  add = (model: Tin) =>
    this.http.post<Response>(`${this.uri}`, model, { headers: this.headers });

  addFormData = (model: Tin, selectedFile?: File | null, formKey?: string) => {
    const formData = new FormData();
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    this.appendNestedObjectToFormData(formData, model);
    if (selectedFile && formKey) formData.append(formKey, selectedFile);
    return this.http.post(`${this.uri}`, formData, {
      headers,
      reportProgress: true,
      observe: 'events',
    });
  };

  GetById = (id: string | number) =>
    this.http.get<Response>(`${this.uri}/GetById`, {
      headers: this.headers,
      params: { id: id },
    });

  update = (id: string | number, model: Tin) =>
    this.http.put<Response>(
      `${this.uri}`,
      { ...model, id },
      { headers: this.headers, params: { id: id } }
    );

  updateFormData = (
    id: string | number,
    model: Tin,
    selectedFile?: File | null,
    formKey?: string
  ) => {
    const formData = new FormData();
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    this.appendNestedObjectToFormData(formData, model);
    if (selectedFile && formKey) formData.append(formKey, selectedFile);
    return this.http.put(`${this.uri}`, formData, {
      headers,
      reportProgress: true,
      observe: 'events',
      params: { id: id },
    });
  };

  delete = (id: string | number) =>
    this.http.delete<Response>(`${this.uri}`, {
      headers: this.headers,
      params: { id: id },
    });

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
