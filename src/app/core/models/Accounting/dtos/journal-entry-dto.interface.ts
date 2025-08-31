import { IBaseDTO } from '../../../Common/models/dtos/base-dto.interfaces';
import { IBranchDTO } from '../../Branches/dtos/branch-dto.interface';

export interface IJournalEntryDTO extends IBaseDTO {
    title: string;
    date: Date;
    branch: IBranchDTO;
}
