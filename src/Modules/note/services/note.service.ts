import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Note } from "../interfaces/Inote";
import { environment } from "src/environments/environment";
import { ResponseDto } from 'src/Modules/shared/interfaces/Iresponse';
import { ToastrService } from 'ngx-toastr';
import { GenericService } from 'src/Modules/shared/services/genericCRUD.service';
import { PrintNote } from '../interfaces/Iprint-note.interface';

@Injectable({
  providedIn: 'root',
})
export class NoteService extends GenericService<Note> {
  constructor(http: HttpClient, override _toastrService: ToastrService) {
    super(http, 'Note', _toastrService);
  }

  getAllVisible = () => this.http.get<ResponseDto>(`${this.uri}/GetAllVisible`, { headers: this.headers });

  getTerms = () => this.http.get<ResponseDto>(`${environment.apiUrl}StageAndTerm/Term`);

  getStages = () => this.http.get<ResponseDto>(`${environment.apiUrl}StageAndTerm/Stage`);

  getOneByTeacher = (id: number) => this.http.get<ResponseDto>(`${this.uri}/GetNotesByTeacherId?Id=${id}`);

  getNoteCompnents = (id: number) => this.http.get<ResponseDto>(`${this.uri}/GetNoteComponent?id=${id}`);

  deleteNoteComponents = (ids: number[]) => this.http.delete<ResponseDto>(`${this.uri}/DeleteNoteComponent`, { body: ids });

  printNote = (model: PrintNote) => this.http.put<ResponseDto>(`${this.uri}/printNote`, model, { headers: this.headers });
}
