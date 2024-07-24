import { ReservedNote } from './IReservedNote.interface';
export interface Reservation {
  id: number;
  createdOn: Date;
  reservedNotes: ReservedNote[];
}
