import { Injectable } from '@angular/core';
import { ResponseDto } from '../../../shared/interfaces/IResponse.dto';
import { PrintNote } from '../models/note/Iprint-note.interface';
import { BaseHttpClient } from '../../../shared/classes/base-http-client.abstract';
import { BACKEND_APIs } from '../apis/backend-apis';
import { HttpHeaders, HttpParams } from '@angular/common/http';
import { map, tap, finalize } from 'rxjs';
import { PagingCriteria } from '../../../shared/interfaces/pagingCriteria';
import { Note } from '../models/note/Inote';

@Injectable({
  providedIn: 'root',
})
export class NoteService extends BaseHttpClient {
  //todo: need fix
  getPagedData(pagingCriteria: PagingCriteria) {
    this.loadingData.next(true);
    const params = new HttpParams({
      fromObject: {
        direction: pagingCriteria.direction,
        pageSize: pagingCriteria.pageSize,
        filter: pagingCriteria.filter,
        orderBy: pagingCriteria.orderBy,
        pageIndex: pagingCriteria.pageIndex,
      },
    });
    return this.httpClient.get<ResponseDto>(BACKEND_APIs.note, { headers: this.headers, params }).pipe(
      map((data) => {
        return {
          status: data.status,
          message: data.message,
          body: data.body,
          totalCount: data.totalCount,
        };
      }),
      tap((data: ResponseDto) => {
        this.dataChange.next(data);
      }),
      finalize(() => this.loadingData.next(false)),
    );
  }

  addFormData = (model: Note, selectedFile?: File | null, formKey?: string) => {
    const formData = new FormData();
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    this.#appendNestedObjectToFormData(formData, model);
    if (selectedFile && formKey) formData.append(formKey, selectedFile);
    return this.httpClient.post(BACKEND_APIs.noteForm, formData, { headers, reportProgress: true, observe: 'events' });
  };

  updateFormData = (model: Note, selectedFile?: File | null, formKey?: string) => {
    const formData = new FormData();
    let headers = new HttpHeaders();
    headers.append('Content-Type', 'multipart/form-data');
    this.#appendNestedObjectToFormData(formData, model);
    if (selectedFile && formKey) formData.append(formKey, selectedFile);
    return this.httpClient.put(BACKEND_APIs.noteForm, formData, { headers, reportProgress: true, observe: 'events' });
  };

  getAllVisible = () => this.httpClient.get<ResponseDto>(BACKEND_APIs.noteVisible, { headers: this.headers });

  deleteNoteComponents = (ids: number[]) => this.httpClient.delete<ResponseDto>(BACKEND_APIs.noteComponent, { body: ids });

  printNote = (model: PrintNote) => this.httpClient.put<ResponseDto>(BACKEND_APIs.notePrint, model, { headers: this.headers });

  #appendNestedObjectToFormData(formData: FormData, object: any) {
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
