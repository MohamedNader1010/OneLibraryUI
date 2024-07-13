import { Injectable } from '@angular/core';
import { Note } from '../interfaces/Inote';
import { environment } from 'src/environments/environment';
import { ResponseDto } from 'src/Modules/shared/interfaces/IResponse.dto';
import { GenericService } from 'src/Modules/shared/services/genericCRUD.service';
import { PrintNote } from '../interfaces/Iprint-note.interface';

@Injectable({
  providedIn: 'root',
})
export class NoteService extends GenericService<Note> {
  override controller = 'Note';
  override uri: string = `${environment.apiUrl}${this.controller}`;

  getAllVisible = () => this.httpClient.get<ResponseDto>(`${this.uri}/GetAllVisible`, { headers: this.headers });

  getTerms = () => this.httpClient.get<ResponseDto>(`${environment.apiUrl}StageAndTerm/Term`);

  getStages = () => this.httpClient.get<ResponseDto>(`${environment.apiUrl}StageAndTerm/Stage`);

  getOneByTeacher = (id: number) => this.httpClient.get<ResponseDto>(`${this.uri}/GetNotesByTeacherId?Id=${id}`);

  getNoteCompnents = (id: number) => this.httpClient.get<ResponseDto>(`${this.uri}/GetNoteComponent?id=${id}`);

  deleteNoteComponents = (ids: number[]) => this.httpClient.delete<ResponseDto>(`${this.uri}/DeleteNoteComponent`, { body: ids });

  printNote = (model: PrintNote) => this.httpClient.put<ResponseDto>(`${this.uri}/printNote`, model, { headers: this.headers });
}
