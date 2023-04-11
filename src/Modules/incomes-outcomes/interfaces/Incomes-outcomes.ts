import {IncomeOutcome} from '../Enums/IncomeOutcomeEnum';

export interface IncomesOutcomes {
	id: number;
	status: IncomeOutcome;
	amount: number;
	comment: string;
	createdOn: Date;
	createdBy: string;
	// modifiedBy: string;
	// modifiedOn: Date;
}
