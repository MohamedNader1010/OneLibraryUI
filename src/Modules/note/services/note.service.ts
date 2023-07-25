import { HttpClient } from "@angular/common/http";
import { Injectable } from "@angular/core";
import { Note } from "../interfaces/Inote";
import { environment } from "src/environments/environment";
import { Response } from "src/Modules/shared/interfaces/Iresponse";
import { ToastrService } from "ngx-toastr";
import { GenericService } from "src/Modules/shared/services/genericCRUD.service";

@Injectable({
	providedIn: "root",
})
export class NoteService extends GenericService<Note> {
	constructor(http: HttpClient, private toastr: ToastrService) {
		super(http, "Note");
	}

	getAllNotes() {
		this.loadingData.next(true);
		this.http.get<Response>(this.uri).subscribe({
			next: (data: Response) => {
				this.dataChange.next(data);
			},
			error: (e) => {
				this.loadingData.next(false);
				let res: Response = e.error ?? e;
				this.toastr.error(res.message);
			},
			complete: () => this.loadingData.next(false),
		});
	}

	getAllVisible = () => this.http.get<Response>(`${this.uri}/GetAllVisible`, { headers: this.headers });

	getTerms = () => this.http.get<Response>(`${environment.apiUrl}StageAndTerm/Term`);
	getStages = () => this.http.get<Response>(`${environment.apiUrl}StageAndTerm/Stage`);

	getOneByTeacher = (id: number) => this.http.get<Response>(`${this.uri}/GetNotesByTeacherId?Id=${id}`);
	getNoteCompnents = (id: number) => this.http.get<Response>(`${this.uri}/GetNoteComponent?id=${id}`);
	deleteNoteComponents = (ids: number[]) => this.http.delete<Response>(`${this.uri}/DeleteNoteComponent`, { body: ids });
}
