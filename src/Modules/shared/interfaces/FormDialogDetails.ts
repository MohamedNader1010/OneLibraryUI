import { FormDialogNames } from "src/Persistents/enums/forms-name";

export interface FormDialogDetails {
    key?: FormDialogNames,
    filePath: string,
    componentName: string
}