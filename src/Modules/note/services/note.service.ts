import {HttpClient} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Note} from '../interfaces/Inote';
import {environment} from 'src/environments/environment';
import {Term} from '../interfaces/ITerm';
import {Stage} from '../interfaces/IStage';
import {Response} from 'src/Modules/shared/interfaces/Iresponse';

@Injectable({
	providedIn: 'root',
})
export class NoteService {
	constructor(private http: HttpClient) {}
	getTerms = () => this.http.get<Term[]>(`${environment.apiUrl}StageAndTerm/Term`);
	getStages = () => this.http.get<Stage[]>(`${environment.apiUrl}StageAndTerm/Stage`);
	uri: string = `${environment.apiUrl}Note/`;
	getAll = () => this.http.get<Response>(`${this.uri}`);
	update = (id: number, note: Note) => this.http.put<Response>(`${this.uri}?Id=${id}`, {...note, id});
	delete = (id: number) => this.http.delete<Response>(`${this.uri}?Id=${id}`);
	getOne = (id: number) => this.http.get<Response>(`${this.uri}GetNotesById?Id=${id}`);
	getOneByTeacher = (id: number) => this.http.get<Response>(`${this.uri}GetNotesByTeacherId?Id=${id}`);
	add = (note: Note) => this.http.post<Response>(`${this.uri}AddNote`, note);
	getNoteCompnents = (id: number) => this.http.get<Response>(`${this.uri}GetNoteComponent?id=${id}`);
	deleteNoteComponents = (ids: number[]) => this.http.delete<Response>(`${this.uri}DeleteNoteComponent`, {body: ids});
}
