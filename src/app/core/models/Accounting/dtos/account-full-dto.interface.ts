import { IBaseDTO } from '../../../Common/models/dtos/base-dto.interfaces';
import { AccountType } from '../../../enums/account-type.enum';
import { IAccountOverviewDTO } from './account-overview-dto.interface';
import { IJournalLineDTO } from './journal-line-dto.interface';

export interface IAccountFullDTO extends IBaseDTO {
    number: string;
    name: string;
    type: AccountType;
    totalDebit: number;
    totalCredit: number;
    balance: number;
    parent?: IAccountOverviewDTO | null;
    journalLines: IJournalLineDTO[];
}
