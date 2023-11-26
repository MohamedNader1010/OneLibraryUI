import { FormDialogNames } from 'src/app/shared/enums/forms-name.enum';

export interface FormDialogDetails {
  key?: FormDialogNames;
  filePath: string;
  componentName: string;
}
