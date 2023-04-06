import { HttpHeaders } from "@angular/common/http";
import { FormDialogDetails } from "src/Modules/shared/interfaces/FormDialogDetails";
import { FormDialogNames } from "./enums/forms-name";

export const _HttpOptions = { headers: new HttpHeaders({ "Content-Type": "application/json" }) };

