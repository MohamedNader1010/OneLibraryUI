import { TransactionSource } from '../../shared/enums/TransactionSource.emun';
import { TransactionStatus } from '../../shared/enums/TransactionStatus.enum';

export interface CommitmentAndDueTransaction {
  commitmentAndDueId: number;
  amount: number;
  status: TransactionStatus;
  source: TransactionSource;
  comment: string;
}
