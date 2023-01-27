import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Injectable} from '@angular/core';
import {Note} from '../interfaces/Inote';
import {environment} from 'src/environments/environment';

@Injectable({
	providedIn: 'root',
})
export class NoteService {
	constructor(private http: HttpClient) {}
	uri: string = `${environment.apiUrl}Note/`;
	getAll = () => this.http.get<Note[]>(`${this.uri}`);
	update = (id: number, note: Note) => this.http.put<Note>(`${this.uri}?Id=${id}`, {...note, id});
	delete = (id: number) => this.http.delete<Note>(`${this.uri}?Id=${id}`);
	getOne = (id: number) => this.http.get<Note>(`${this.uri}GetNotesById?Id=${id}`);
	getOneByTeacher = (id: number) => this.http.get<Note>(`${this.uri}GetNotesByTeacherId?Id=${id}`);
	add = (note: Note) => this.http.post<Note>(`${this.uri}AddNote`, note);
}
