import { TransactionSource } from '../enums/TransactionSource.enum';

export const TransactionSourceMapper = new Map<TransactionSource, string>([
  [TransactionSource.Bank, 'البنك'],
  [TransactionSource.daily, 'اليومية'],
]);
