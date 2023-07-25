import { IncomeOutcome } from "../../incomes-outcomes/interfaces/Iincome-outcome";

export interface Bank {

  id: number;
  name: string;
  startingBalance: string;
  balance: string;
  totalIncome: string;
  totalOutcome: string;
  transactions: IncomeOutcome[];
	createdOn: Date;
	createdBy: string;
}
