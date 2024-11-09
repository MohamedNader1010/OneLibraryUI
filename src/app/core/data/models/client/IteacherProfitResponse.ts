import { TeacherProfitNote } from './IteacherProfitNotes';
export interface TeacherProfitResponse {
  clientId: number;
  name: string;

  totalForOrders: number;
  paidForOrders: number;
  restForOrders: number;

  totalEarning: number;
  totalCollected: number;
  totalPending: number;
  rest: number;
  notes: TeacherProfitNote[];
}
