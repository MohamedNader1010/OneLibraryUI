
import { FormDialogNames } from "src/Persistents/enums/forms-name";


export class FormHelpers {

    public static async getAppropriateDialogComponent(formName: FormDialogNames) {
        const appropriateComponent = await FormHelpers.getAppropriateComponent(formName)
        return appropriateComponent;
    }
    private static async getAppropriateComponent(formName: FormDialogNames) {
        let module;
        switch (formName) {
            case FormDialogNames.MaterialFormDialogComponent:
                module = await import('../../material/components/material-form-dialog/material-form-dialog.component');
                return module.MaterialFormDialogComponent;
            case FormDialogNames.OrderFormDialogComponent:
                module = await import('../../order/components/order-form-dialog/order-form-dialog.component');
                return module.OrderFormDialogComponent;
            case FormDialogNames.NoteFormDialogComponent:
                module = await import('../../note/components/note-form-dialog/note-form-dialog.component')
                return module.NoteFormDialogComponent;
            case FormDialogNames.EmployeeFormDialogComponent:
                module = await import('../../employee/components/employee-form-dialog/employee-form-dialog.component')
                return module.EmployeeFormDialogComponent;
            case FormDialogNames.ClientFormDialogComponent:
                module = await import('../../client/components/client-form-dialog/client-form-dialog.component')
                return module.ClientFormDialogComponent;
        }
    }



}



