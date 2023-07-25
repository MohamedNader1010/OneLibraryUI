import { Attendance } from "../../attendance/interfaces/attendance";
import { MaterialIncomeOutcome } from "./Imaterial-income-outcome";
import { IncomeOutcome } from "./Iincome-outcome";

export interface Shift {
	id: number;
  startTime: Date;
  endTime: Date|null;
  startingBalance: string|null;
  closingBalance: string;
  totalIncome: string;
  totalOutcome: string;
  createdOn: Date;
  createdBy: string|null;
  incomeOutcomes: IncomeOutcome[];
  materialIncomeOutcomes: MaterialIncomeOutcome[];
  attendances: Attendance[];
}
