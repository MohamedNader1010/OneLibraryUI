import { INoteComponentRequestDTO } from '../dtos/note-component-request-dto.interface';

export interface ICreateNoteCommand {
  name: string;
  quantity: number;
  teacherId: string;
  termId?: string;
  stageId?: string;
  pdf: File; // IFormFile equivalent
  isVisible: boolean;
  fiscalYearId?: string;
  reservationRequired: boolean;
  teacherPrice: number;
  noteComponents: INoteComponentRequestDTO[];
}
