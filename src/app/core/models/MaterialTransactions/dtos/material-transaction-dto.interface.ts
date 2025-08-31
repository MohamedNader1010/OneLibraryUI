import { IBaseDTO } from '../../../Common/models/dtos/base-dto.interfaces';
import { JournalDirection } from '../../../enums/journal-direction.enum';
import { MaterialTransactionType } from '../../../enums/material-transaction-type.enum';
import { IMaterialDTO } from '../../Materials/dtos/material-dto.interface';

export interface IMaterialTransactionDTO extends IBaseDTO {
    material: IMaterialDTO;
    type: MaterialTransactionType;
    direction: JournalDirection;
    comment: string;
    quantity: number;
    unitPrice: number;
    totalValue: number;
    orderId?: string;
    supplierInvoiceId?: string;
}
