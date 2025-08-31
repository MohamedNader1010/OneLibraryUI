import { IBaseDTO } from '../../../Common/models/dtos/base-dto.interfaces';
import { IAccountOverviewDTO } from '../../Accounting/dtos/account-overview-dto.interface';
import { INoteOverviewDTO } from '../../Notes/dtos/note-overview-dto.interface';
import { IOrderOverViewDTO } from '../../Orders/dtos/order-overview-dto.interface';

export interface ITeacherFullDTO extends IBaseDTO {
    name: string;
    phoneNumber: string;
    orders: IOrderOverViewDTO[];
    notes: INoteOverviewDTO[];
    account: IAccountOverviewDTO;
}
