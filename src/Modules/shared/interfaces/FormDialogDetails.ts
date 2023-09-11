import { FormDialogNames } from 'src/Modules/shared/enums/forms-name.enum';

export interface FormDialogDetails {
  key?: FormDialogNames;
  filePath: string;
  componentName: string;
}
