import { TransactionStatus } from '../enums/TransactionStatus.enum';

export const TransactionStatusMapper = new Map<TransactionStatus, string>([
  [TransactionStatus.Credit, 'وارد'],
  [TransactionStatus.Debit, 'صادر'],
]);
