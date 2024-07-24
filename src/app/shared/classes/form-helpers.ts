import { FormDialogNames } from '../enums/forms-name.enum';

export class FormHelpers {
  public static async getAppropriateDialogComponent(formName: FormDialogNames) {
    const appropriateComponent = await FormHelpers.getAppropriateComponent(formName);
    return appropriateComponent;
  }
  private static async getAppropriateComponent(formName: FormDialogNames) {
    let module;
    switch (formName) {
      case FormDialogNames.MaterialFormDialogComponent:
        module = await import('../../Modules/material/components/material-form-dialog/material-form-dialog.component');
        return module.MaterialFormDialogComponent;
      case FormDialogNames.OrderFormDialogComponent:
        module = await import('../../Modules/order/components/order-form-dialog/order-form-dialog.component');
        return module.OrderFormDialogComponent;
      case FormDialogNames.NoteFormDialogComponent:
        module = await import('../../Modules/note/components/note-form-dialog/note-form-dialog.component');
        return module.NoteFormDialogComponent;
      case FormDialogNames.EmployeeFormDialogComponent:
        module = await import('../../Modules/employee/components/employee-form-dialog/employee-form-dialog.component');
        return module.EmployeeFormDialogComponent;
      case FormDialogNames.ClientFormDialogComponent:
        module = await import('../../Modules/client/components/client-form-dialog/client-form-dialog.component');
        return module.ClientFormDialogComponent;
      case FormDialogNames.ClientTypeFormDialogComponent:
        module = await import('../../Modules/client-type/components/client-type-form-dialog/client-type-form-dialog.component');
        return module.ClientTypeFormDialogComponent;
      case FormDialogNames.ServiceFormDialogComponent:
        module = await import('../../Modules/service/components/service-form-dialog/service-form-dialog.component');
        return module.ServiceFormDialogComponent;
      case FormDialogNames.ServiceTypeFormDialogComponent:
        module = await import('../../Modules/service-type/components/service-type-form-dialog/service-type-form-dialog.component');
        return module.ServiceTypeFormDialogComponent;
      case FormDialogNames.ServicePricePerClientFormDialogComponent:
        module = await import('../../Modules/service-price-per-client-type/Components/service-type-per-client-form-dialog/service-type-per-client-form-dialog.component');
        return module.ServiceTypePerClientFormDialogComponent;
      case FormDialogNames.AttendanceFormDialogComponent:
        module = await import('../../Modules/attendance/components/attendance-form-dialog/attendance-form-dialog.component');
        return module.AttendanceFormDialogComponent;
      case FormDialogNames.feedbackFormDialogComponent:
        module = await import('../../Modules/feadback/components/client-feedback-form-dialog/client-feedback-form.dialog.component');
        return module.ClientFeedbackFormDialogComponent;
      case FormDialogNames.incomeOutcomeFormDialogComponent:
        module = await import('../../Modules/incomes-outcomes/components/formDialog/form.dialog.component');
        return module.FormDialogComponent;
      case FormDialogNames.materialTrackingFormDialogComponent:
        module = await import('../../Modules/material-tracking/components/formDialog/form.dialog.component');
        return module.FormDialogComponent;
      case FormDialogNames.orderTransactionFormDialogComponent:
        module = await import('../../Modules/order/components/transaction/transaction.component');
        return module.TransactionComponent;
      case FormDialogNames.orderDetailsDialogComponent:
        module = await import('../../Modules/order/components/details/details.component');
        return module.DetailsComponent;
      case FormDialogNames.shiftFormDialogComponent:
        module = await import('../../Modules/shift/components/close-start-shift-form-dialog/close-start-shift-form-dialog.component');
        return module.CloseStartShiftFormDialogComponent;
      case FormDialogNames.bankFormDialogComponent:
        module = await import('../../Modules/bank/components/bank-form-dialog/bank-form-dialog.component');
        return module.BankFormDialogComponent;
      case FormDialogNames.supplierFormDialogComponent:
        module = await import('../../Modules/supplier/components/supplier-form-dialog/supplier-form-dialog.component');
        return module.SupplierFormDialogComponent;
      case FormDialogNames.commitmentAndDueComponent:
        module = await import('../../Modules/commitment-and-due/components/commitment-and-due-form-dialog/commitment-and-due-form-dialog.component');
        return module.CommitmentAndDueFormDialogComponent;
      case FormDialogNames.commitmentAndDueComponentTransactionFormDialog:
        module = await import('../../Modules/commitment-and-due/components/commitment-and-due-transaction-form-dialog/commitment-and-due-transaction-form-dialog.component');
        return module.CommitmentAndDueTransactionFormDialogComponent;
      case FormDialogNames.clientBulkPaymentFormDialog:
        module = await import('../../Modules/client/components/client-bulk-payment-form/client-bulk-payment-form.component');
        return module.ClientBulkPaymentFormComponent;
      case FormDialogNames.UnFinishedOrdersComponent:
        module = await import('../../Modules/order/components/unfinished-orders/unfinished-orders.component');
        return module.UnfinishedOrdersComponent;
    }
  }
}
