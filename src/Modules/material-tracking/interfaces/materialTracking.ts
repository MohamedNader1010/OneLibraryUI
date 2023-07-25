import { IncomeOutcomeStatus } from "../../../Persistents/enums/IncomeOutcome.enum";

export interface MaterialTracking {
	id: number;
	material: string;
	materialId: number;
	status: IncomeOutcomeStatus;
	quantity: number;
	comment: string;
	createdOn: Date;
	createdBy: string;
	// modifiedBy: string;
	// modifiedOn: Date;
}
