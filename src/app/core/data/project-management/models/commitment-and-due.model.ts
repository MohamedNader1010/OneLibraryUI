import { TransactionSource } from '../../../../shared/enums/TransactionSource.emun';
import { TransactionType } from '../../../../shared/enums/TransactionType.enum';
import { IncomeOutcome } from './income-outcome.model';

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
  transactions: IncomeOutcome[];
  createdOn: Date;
  createdBy: string;
}
