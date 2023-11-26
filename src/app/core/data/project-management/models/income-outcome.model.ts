import { TransactionStatus } from '../../../../shared/enums/TransactionStatus.enum';
import { TransactionSource } from '../../../../shared/enums/TransactionSource.emun';

export interface IncomeOutcome {
  id: number;
  status: TransactionStatus;
  source: TransactionSource;
  amount: number;
  comment: string;
  createdOn: Date;
  createdBy: string;
}
