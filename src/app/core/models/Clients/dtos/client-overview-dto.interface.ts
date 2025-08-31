import { IBaseDTO } from '../../../Common/models/dtos/base-dto.interfaces';

export interface IClientOverviewDTO extends IBaseDTO {
    name: string;
    phoneNumber: string;
    clientType: IClientOverviewDTO;
    total: number;
    paid: number;
    rest: number;
}
