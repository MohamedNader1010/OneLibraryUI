import { Attendance } from '../attendance/attendance';
import { MaterialTransactions } from '../material-transaction/Imaterial-transaction';
import { Transaction } from '../money-transaction/ITransaction';

export interface Shift {
  id: number;
  startTime: Date;
  endTime: Date | null;
  startingBalance: string | null;
  closingBalance: string;
  totalDebit: string;
  totalCredit: string;
  createdOn: Date;
  createdBy: string | null;
  transactions: Transaction[];
  materialTransactions: MaterialTransactions[];
  attendances: Attendance[];
}
