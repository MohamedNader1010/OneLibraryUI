import { TransactionStatus } from '../../shared/enums/TransactionStatus.enum';

export interface MaterialTracking {
  id: number;
  material: string;
  materialId: number;
  status: TransactionStatus;
  quantity: number;
  comment: string;
  createdOn: Date;
  createdBy: string;
  // modifiedBy: string;
  // modifiedOn: Date;
}
