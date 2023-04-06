
import { FormDialogNames } from "src/Persistents/enums/forms-name";

export class FormHelpers {

    public static async getAppropriateDialogComponent(formName: FormDialogNames) {
        const appropriateComponent = await FormHelpers.getAppropriateComponent(formName);
        return appropriateComponent;
    }
    private static async getAppropriateComponent(formName: FormDialogNames) {
        let module;
        switch (formName) {
            case FormDialogNames.MaterialFormDialogComponent:
                module = await import('../../material/components/material-form-dialog/material-form-dialog.component');
                return module.MaterialFormDialogComponent;
            // case FormDialogNames.IncomeMaterialFormDialogComponent:
            //     module = await import('../../../Modules/feadback/components/formDialog/form.dialog.component')
            //     return module.FormDialogComponent;
        }
    }


}

