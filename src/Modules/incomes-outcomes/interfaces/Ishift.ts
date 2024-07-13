import { Attendance } from "../../attendance/interfaces/attendance";
import { MaterialIncomeOutcome as MaterialTransactions } from './Imaterial-income-outcome';
import { IncomeOutcome as transactions } from './Iincome-outcome';

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
