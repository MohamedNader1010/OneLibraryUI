import { INoteClientDTO } from './note-client-dto.interface';

export interface INoteWithClientsDTO {
  id: string;
  name: string;
  quantity: number;
  teacher: string;
  clientType: string;
  actualPrice: number;
  teacherPrice: number;
  finalPrice: number;
  stage?: string;
  term?: string;
  originalPrice: number;
  earning: number;
  fileName?: string;
  filePath?: string;
  isVisible: boolean;
  fiscalYearId?: string;
  reservationRequired: boolean;
  noteClients: INoteClientDTO[];
}
