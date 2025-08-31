import { IBaseDTO } from '../../../Common/models/dtos/base-dto.interfaces';

export interface IShiftDTO extends IBaseDTO {
    startTime: Date;
    endTime?: Date;
    startingBalance: number;
    closingBalance: number;
    totalDebit: number;
    totalDebitCash: number;
    totalDebitInstapay: number;
    totalDebitWallet: number;
    totalCredit: number;
    totalCreditCash: number;
    totalCreditInstapay: number;
    totalCreditWallet: number;
    isCurrent: boolean;
}
