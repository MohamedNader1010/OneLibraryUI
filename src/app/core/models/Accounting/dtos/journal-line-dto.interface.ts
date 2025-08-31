import { IBaseDTO } from '../../../Common/models/dtos/base-dto.interfaces';
import { JournalDirection } from '../../../enums/journal-direction.enum';
import { IJournalEntryDTO } from './journal-entry-dto.interface';

export interface IJournalLineDTO extends IBaseDTO {
    amount: number;
    direction: JournalDirection;
    journalEntry: IJournalEntryDTO;
}
