import { IBaseDTO } from '../../../Common/models/dtos/base-dto.interfaces';
import { AccountType } from '../../../enums/account-type.enum';

export interface IAccountOverviewDTO extends IBaseDTO {
    number: string;
    name: string;
    type: AccountType;
    totalDebit: number;
    totalCredit: number;
    balance: number;
}
