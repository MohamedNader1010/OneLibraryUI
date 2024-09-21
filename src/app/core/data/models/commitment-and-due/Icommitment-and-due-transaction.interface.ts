import { TransactionSource } from '../../../../shared/enums/TransactionSource.enum';
import { TransactionStatus } from '../../../../shared/enums/TransactionStatus.enum';

export interface CommitmentAndDueTransaction {
  commitmentAndDueId: number;
  amount: number;
  status: TransactionStatus;
  source: TransactionSource;
  comment: string;
}
