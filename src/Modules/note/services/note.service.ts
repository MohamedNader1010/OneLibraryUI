import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Note } from "../interfaces/Inote";
import { environment } from "src/environments/environment";
import { Response } from "src/Modules/shared/interfaces/Iresponse";
import { ToastrService } from "ngx-toastr";
import { GenericService } from "src/Modules/shared/services/genericCRUD.service";

@Injectable({
  providedIn: 'root',
})
export class NoteService extends GenericService<Note> {
  constructor(http: HttpClient, override _toastrService: ToastrService) {
    super(http, 'Note', _toastrService);
  }

  getAllVisible = () => this.http.get<Response>(`${this.uri}/GetAllVisible`, { headers: this.headers });

  getTerms = () => this.http.get<Response>(`${environment.apiUrl}StageAndTerm/Term`);
  getStages = () => this.http.get<Response>(`${environment.apiUrl}StageAndTerm/Stage`);

  getOneByTeacher = (id: number) => this.http.get<Response>(`${this.uri}/GetNotesByTeacherId?Id=${id}`);
  getNoteCompnents = (id: number) => this.http.get<Response>(`${this.uri}/GetNoteComponent?id=${id}`);
  deleteNoteComponents = (ids: number[]) => this.http.delete<Response>(`${this.uri}/DeleteNoteComponent`, { body: ids });
}
