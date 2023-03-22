import {IncomeOutcome} from '../Enums/IncomeOutcomeEnum';

export interface MaterialTracking {
	id: number;
	material: string;
	materialId: number;
	status: IncomeOutcome;
	quantity: number;
	comment: string;
	createdOn: Date;
	createdBy: string;
	// modifiedBy: string;
	// modifiedOn: Date;
}
