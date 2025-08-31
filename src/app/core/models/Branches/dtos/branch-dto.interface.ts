import { IBaseDTO } from '../../../Common/models/dtos/base-dto.interfaces';

export interface IBranchDTO extends IBaseDTO {
    name: string;
    code: string;
}
