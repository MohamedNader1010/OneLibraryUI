import { IBaseDTO } from '../../../Common/models/dtos/base-dto.interfaces';

export interface ITeacherOverviewDTO extends IBaseDTO {
    id: string;
    name: string;
    phoneNumber: string;
    total: number;
    paid: number;
    rest: number;
}
