import { TransactionStatus } from '../../../../shared/enums/TransactionStatus.enum';
import { Material } from '../material/Imaterial';

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
