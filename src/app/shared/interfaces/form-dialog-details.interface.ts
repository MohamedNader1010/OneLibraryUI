import { FormDialogNames } from '../enums/forms-name.enum';

export interface FormDialogDetails {
  key?: FormDialogNames;
  filePath: string;
  componentName: string;
}
