import { TransactionSource } from '../../../../shared/enums/TransactionSource.enum';
import { TransactionType } from '../../../../shared/enums/TransactionType.enum';
import { Transaction } from '../money-transaction/ITransaction';

export interface CommitmentAndDue {
  id: number;
  name: string;
  amount: number;
  paid: number;
  rest: number;
  comment: string;
  source: TransactionSource;
  type: TransactionType;
  supplierId: number;
  supplier: string;
  employeeId: string;
  employee: string;
  transactions: Transaction[];
  createdOn: Date;
  createdBy: string;
}
