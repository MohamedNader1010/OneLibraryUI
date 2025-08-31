import { INoteComponentDTO } from './note-component-dto.interface';

export interface INoteDTO {
  id: string;
  name: string;
  quantity: number;
  teacherId: string;
  clientTypeId: string;
  teacher: string;
  clientType: string;
  actualPrice: number;
  teacherPrice: number;
  finalPrice: number;
  termId?: string;
  stageId?: string;
  stage?: string;
  term?: string;
  originalPrice: number;
  earning: number;
  fileName?: string;
  filePath?: string;
  isVisible: boolean;
  fiscalYearId?: string;
  reservationRequired: boolean;
  noteComponents: INoteComponentDTO[];
}
