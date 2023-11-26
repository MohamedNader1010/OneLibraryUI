import { Material } from './material.model';
import { TransactionStatus } from '../../../../shared/enums/TransactionStatus.enum';

export interface MaterialIncomeOutcome {
  id: number;
  status: TransactionStatus;
  quantity: number;
  comment: string;
  material: Material;
  materialId: number;
  createdOn: Date;
  createdBy: string;
}
