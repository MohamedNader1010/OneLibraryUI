import { ReservedNote } from './ReservedNote.model';
export interface Reservation {
  id: number;
  createdOn: Date;
  reservedNotes: ReservedNote[];
}
