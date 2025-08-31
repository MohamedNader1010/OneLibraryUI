import { Component, Input } from '@angular/core';
import { INoteClientDTO } from '../../../../../core/models/Notes/dtos/note-client-dto.interface';

@Component({
    selector: 'app-note-clients-sub-table',
    templateUrl: './note-clients-sub-table.component.html',
    styleUrls: ['../../table.component.css', './note-clients-sub-table.component.css']
})
export class NoteClientsSubTableComponent {
    @Input() data: INoteClientDTO[] = [];
    displayedColumns: string[] = ['name', 'quantity'];
    getTotal = (): number => this.data.map((t) => t.quantity || 0).reduce((acc: number, value: number) => acc + Number(value), 0);
}
