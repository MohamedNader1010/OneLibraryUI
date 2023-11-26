import { Attendance } from './attendance.model';
import { MaterialIncomeOutcome } from './material-income-outcome.model';
import { IncomeOutcome } from './income-outcome.model';

export interface Shift {
  id: number;
  startTime: Date;
  endTime: Date | null;
  startingBalance: string | null;
  closingBalance: string;
  totalIncome: string;
  totalOutcome: string;
  createdOn: Date;
  createdBy: string | null;
  incomeOutcomes: IncomeOutcome[];
  materialIncomeOutcomes: MaterialIncomeOutcome[];
  attendances: Attendance[];
}
