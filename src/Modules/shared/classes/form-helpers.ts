import {FormDialogNames} from 'src/Persistents/enums/forms-name';
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
      case FormDialogNames.ServicePricePerClientFormDialogComponent:
        module = await import('../../service-price-per-client-type/Components/service-type-per-client-form-dialog/service-type-per-client-form-dialog.component');
        return module.ServiceTypePerClientFormDialogComponent;
      case FormDialogNames.AttendanceFormDialogComponent:
        module = await import('../../attendance/components/attendance-form-dialog/attendance-form-dialog.component');
        return module.AttendanceFormDialogComponent;
      case FormDialogNames.feedbackFormDialogComponent:
        module = await import('../../feadback/components/formDialog/form.dialog.component');
        return module.FormDialogComponent;
      case FormDialogNames.incomeOutcomeFormDialogComponent:
        module = await import('../../incomes-outcomes/components/formDialog/form.dialog.component');
        return module.FormDialogComponent;
      case FormDialogNames.materialTrackingFormDialogComponent:
        module = await import('../../material-tracking/components/formDialog/form.dialog.component');
        return module.FormDialogComponent;
      case FormDialogNames.orderTransactionFormDialogComponent:
        module = await import('../../order/components/transaction/transaction.component');
        return module.TransactionComponent;
      case FormDialogNames.orderDetailsDialogComponent:
        module = await import('../../order/components/details/details.component');
        return module.DetailsComponent;
      case FormDialogNames.shiftFormDialogComponent:
        module = await import('../../incomes-outcomes/components/close-start-shift-form-dialog/close-start-shift-form-dialog.component');
        return module.CloseStartShiftFormDialogComponent;
      case FormDialogNames.bankFormDialogComponent:
        module = await import('../../bank/components/bank-form-dialog/bank-form-dialog.component');
        return module.BankFormDialogComponent;
      case FormDialogNames.supplierFormDialogComponent:
        module = await import('../../supplier/components/supplier-form-dialog/supplier-form-dialog.component');
        return module.SupplierFormDialogComponent;
    }
	}

	public static async getDeleteDialogComponent() {
		const deleteDialogComponent = await FormHelpers.importDialogComponent();
		return deleteDialogComponent;
	}

	private static async importDialogComponent() {
		const module = await import('../components/delete-dialog/delete-dialog.component');
		return module.DeleteDialogComponent;
	}
}
