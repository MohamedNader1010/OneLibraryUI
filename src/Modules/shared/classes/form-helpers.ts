import { ComponentsName } from 'src/Persistents/enums/components.name';
import { FormDialogNames } from 'src/Persistents/enums/forms-name';
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
			case FormDialogNames.OrderFormDialogComponent:
				module = await import('../../order/components/order-form-dialog/order-form-dialog.component');
				return module.OrderFormDialogComponent;
			case FormDialogNames.NoteFormDialogComponent:
				module = await import('../../note/components/note-form-dialog/note-form-dialog.component');
				return module.NoteFormDialogComponent;
			case FormDialogNames.EmployeeFormDialogComponent:
				module = await import('../../employee/components/employee-form-dialog/employee-form-dialog.component');
				return module.EmployeeFormDialogComponent;
			case FormDialogNames.ClientFormDialogComponent:
				module = await import('../../client/components/client-form-dialog/client-form-dialog.component');
				return module.ClientFormDialogComponent;
			case FormDialogNames.ClientTypeFormDialogComponent:
				module = await import('../../clientType/components/client-type-form-dialog/client-type-form-dialog.component');
				return module.ClientTypeFormDialogComponent;
			case FormDialogNames.ServiceFormDialogComponent:
				module = await import('../../service/components/service-form-dialog/service-form-dialog.component');
				return module.ServiceFormDialogComponent;
			case FormDialogNames.ServiceTypeFormDialogComponent:
				module = await import('../../serviceType/components/service-type-form-dialog/service-type-form-dialog.component');
				return module.ServiceTypeFormDialogComponent;
			case FormDialogNames.ServiceTypPerClientFormDialogComponent:
				module = await import('../../service-price-per-client-type/Components/service-type-per-client-form-dialog/service-type-per-client-form-dialog.component');
				return module.ServiceTypePerClientFormDialogComponent;
		}
	}

	public static async getDeleteDialogComponent(componentName: ComponentsName) {
		const deleteDialogComponent = await FormHelpers.importDialogComponent();
		return deleteDialogComponent;
	}

	private static async importDialogComponent() {

		const module = await import('../components/delete-dialog/delete-dialog.component');
		return module.DeleteDialogComponent as typeof module.DeleteDialogComponent;

	}
}
