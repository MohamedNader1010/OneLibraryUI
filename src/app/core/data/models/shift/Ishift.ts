import { Attendance } from '../attendance/attendance';
import { MaterialIncomeOutcome as MaterialTransactions } from '../material-transaction/Imaterial-income-outcome';
import { Transaction as transactions } from '../money-transaction/Iincome-outcome';

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
  transactions: transactions[];
  materialTransactions: MaterialTransactions[];
  attendances: Attendance[];
}
