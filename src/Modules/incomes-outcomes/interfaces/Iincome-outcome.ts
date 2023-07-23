import {IncomeOutcomeStatus} from '../../../Persistents/enums/IncomeOutcome.enum';
import { IncomeOutcomeSource } from "../../../Persistents/enums/IncomeOutcomeSource.emun";

export interface IncomeOutcome {
	id: number;
	status: IncomeOutcomeStatus;
  source: IncomeOutcomeSource;
	amount: number;
	comment: string;
	createdOn: Date;
	createdBy: string;
}
