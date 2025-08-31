import { IBaseDTO } from '../../../Common/models/dtos/base-dto.interfaces';
import { IAccountOverviewDTO } from '../../Accounting/dtos/account-overview-dto.interface';
import { IOrderOverViewDTO } from '../../Orders/dtos/order-overview-dto.interface';
import { IClientOverviewDTO } from './client-overview-dto.interface';

export interface IClientFullDTO extends IBaseDTO {
    name: string;
    phoneNumber: string;
    orders: IOrderOverViewDTO[];
    account: IAccountOverviewDTO;
    clientType: IClientOverviewDTO;
}
