import { IBaseDTO } from '../../../Common/models/dtos/base-dto.interfaces';

export interface IMaterialDTO extends IBaseDTO {
    name: string;
    sku: string;
}
