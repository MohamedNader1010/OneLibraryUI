import {FormDialogNames} from 'src/Persistents/enums/forms-name';

export class FormHelpers {
	public static async getAppropriateDialogComponent(formName: FormDialogNames) {
		const appropriateComponent = await FormHelpers.getAppropriateComponent(formName);
		return appropriateComponent;
	}

	public static async getAppropriateDeleteDialogComponent() {
		const appropriateComponent = await FormHelpers.getAppropriateDeleteComponent();
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
		}
	}
	private static async getAppropriateDeleteComponent() {
		let module;
		module = await import('../../material/components/delete/delete.dialog.component');
		return module.DeleteDialogComponent;
	}
}
