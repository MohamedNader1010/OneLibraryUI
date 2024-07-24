import { Transaction } from '../money-transaction/Iincome-outcome';

export interface Bank {
  id: number;
  name: string;
  startingBalance: string;
  balance: string;
  totalDebit: string;
  totalCredit: string;
  transactions: Transaction[];
  createdOn: Date;
  createdBy: string;
}
