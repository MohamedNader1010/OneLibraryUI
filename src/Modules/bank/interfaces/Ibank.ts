import { IncomeOutcome } from "../../incomes-outcomes/interFaces/Iincome-outcome";

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
