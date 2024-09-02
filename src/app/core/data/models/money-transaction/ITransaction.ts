import { TransactionSource } from '../../../../shared/enums/TransactionSource.emun';
import { TransactionStatus } from '../../../../shared/enums/TransactionStatus.enum';

export interface Transaction {
  id: number;
  status: TransactionStatus;
  source: TransactionSource;
  amount: number;
  comment: string;
  createdOn: Date;
  createdBy: string;
}
