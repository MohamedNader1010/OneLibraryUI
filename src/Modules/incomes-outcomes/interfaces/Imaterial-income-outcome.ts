import { Material } from "../../material/interfaces/Imaterial";
import { IncomeOutcomeStatus } from "../../../Persistents/enums/IncomeOutcome.enum";

export interface MaterialIncomeOutcome {
	id: number;
	status: IncomeOutcomeStatus;
	quantity: number;
	comment: string;
  material: Material;
  materialId:number;
	createdOn: Date;
	createdBy: string;
}
