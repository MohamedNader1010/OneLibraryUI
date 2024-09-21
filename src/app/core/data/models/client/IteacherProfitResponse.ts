import { TeacherProfitNote } from './IteacherProfitNotes';
export interface TeacherProfitResponse {
  clientId: number;
  name: string;
  totalEarning: number;
  restForTeacher: number;
  totalCredit: number;
  totalDebit: number;
  rest: number;
  notes: TeacherProfitNote[];
}
