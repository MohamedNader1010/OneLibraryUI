import { Injectable } from '@angular/core';
import { HttpEvent } from '@angular/common/http';
import { BaseApiRepository } from './common/base-api.repository';
import { BACKEND_APIs } from '../apis/backend-apis';
import { IPagedResponse } from '../Common/models/response/paged-response.interface';
import { INoteDTO } from '../models/Notes/dtos/note-dto.interface';
import { IApiResponseT } from '../Common/models/response/api-response-t.interface';
import { IGetNoteWithClientsQuery } from '../models/Notes/queries/get-note-with-clients-query.interface';
import { INoteWithClientsDTO } from '../models/Notes/dtos/note-with-clients-dto.interface';
import { INoteOverviewDTO } from '../models/Notes/dtos/note-overview-dto.interface';
import { ICreateNoteCommand } from '../models/Notes/commands/create-note-command.interface';
import { IUpdateNoteCommand } from '../models/Notes/commands/update-note-command.interface';
import { IPrintNoteCommand } from '../models/Notes/commands/print-note-command.interface';
import { Observable } from 'rxjs';
import { IGetAllNotesQuery } from './../models/Notes/queries/get-all-notes-query.interface';

@Injectable({ providedIn: 'root' })
export class NoteRepository extends BaseApiRepository {
    getAllPaginated = (query: IGetAllNotesQuery): Observable<IPagedResponse<INoteDTO>> =>
        this.getPaginated<IPagedResponse<INoteDTO>>(BACKEND_APIs.notes.root, query);

    getNoteClientsById = (query: IGetNoteWithClientsQuery): Observable<IApiResponseT<INoteWithClientsDTO>> =>
        this.get<IApiResponseT<INoteWithClientsDTO>>(`${BACKEND_APIs.notes.clients(query.id)}`);

    getAllVisible = (): Observable<IApiResponseT<INoteOverviewDTO[]>> =>
        this.get<IApiResponseT<INoteOverviewDTO[]>>(BACKEND_APIs.notes.visible());

    add = (command: ICreateNoteCommand): Observable<HttpEvent<IApiResponseT<any>>> =>
        this.postForm<IApiResponseT<any>, ICreateNoteCommand>(BACKEND_APIs.notes.form(), command);

    edit = (command: IUpdateNoteCommand): Observable<HttpEvent<IApiResponseT<any>>> =>
        this.putForm<IApiResponseT<any>, IUpdateNoteCommand>(BACKEND_APIs.notes.form(), command);

    Print = (command: IPrintNoteCommand): Observable<IApiResponseT<any>> =>
        this.put<IApiResponseT<any>>(BACKEND_APIs.notes.print(), command);
}
