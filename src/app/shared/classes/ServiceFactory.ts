import { Injectable } from '@angular/core';
import { AttendanceService } from '../../core/data/services/attendance.service';
import { BankService } from '../../core/data/services/bank.service';
import { ClientService } from '../../core/data/services/client.service';
import { ClientTypeService } from '../../core/data/services/client-type.service';
import { CommitmentAndDueService } from '../../core/data/services/commitment-and-due.service';
import { EmployeeService } from '../../core/data/services/employee.service';
import { FeedbackService } from '../../core/data/services/feedback.service';
import { MoneyTransactionService } from '../../core/data/services/money-transaction.service';
import { MaterialService } from '../../core/data/services/material.service';
import { MaterialTrackingService } from '../../core/data/services/material-tracking.service';
import { NoteService } from '../../core/data/services/note.service';
import { OrderService } from '../../core/data/services/orders.service';
import { ServicePricePerClientTypeService } from '../../core/data/services/service-price-per-client-type.service';
import { ServicesService } from '../../core/data/services/services.service';
import { ServicesTypeService } from '../../core/data/services/service-type.service';
import { ShiftService } from '../../core/data/services/shift.service';
import { SupplierService } from '../../core/data/services/supplier.service';
import { ComponentsName } from '../enums/components.name.enum';

@Injectable({
  providedIn: 'root',
})
export class ServiceFactory {
  constructor(
    private _materialService: MaterialService,
    private _attendnaceService: AttendanceService,
    private _clientService: ClientService,
    private _feedbackService: FeedbackService,
    private _incomeOutcomeService: MoneyTransactionService,
    private _materialTrackingService: MaterialTrackingService,
    private _noteService: NoteService,
    private _orderService: OrderService,
    private _serviceService: ServicesService,
    private _clientTypeService: ClientTypeService,
    private _serviceTypeService: ServicesTypeService,
    private _servicePricePerClientTypeService: ServicePricePerClientTypeService,
    private _employeeService: EmployeeService,
    private _shiftService: ShiftService,
    private _bankService: BankService,
    private _supplierService: SupplierService,
    private _commitmentAndDueService: CommitmentAndDueService,
  ) {}

  getService(componentName: ComponentsName) {
    switch (componentName) {
      case ComponentsName.material:
        return this._materialService;
      case ComponentsName.attendance:
        return this._attendnaceService;
      case ComponentsName.client:
        return this._clientService;
      case ComponentsName.clientType:
        return this._clientTypeService;
      case ComponentsName.feedback:
        return this._feedbackService;
      case ComponentsName.incomeOutcome:
        return this._incomeOutcomeService;
      case ComponentsName.materialTracking:
        return this._materialTrackingService;
      case ComponentsName.note:
        return this._noteService;
      case ComponentsName.order:
        return this._orderService;
      case ComponentsName.service:
        return this._serviceService;
      case ComponentsName.serviceType:
        return this._serviceTypeService;
      case ComponentsName.servicePricePerClientType:
        return this._servicePricePerClientTypeService;
      case ComponentsName.employee:
        return this._employeeService;
      case ComponentsName.shift:
        return this._shiftService;
      case ComponentsName.Bank:
        return this._bankService;
      case ComponentsName.supplier:
        return this._supplierService;
      case ComponentsName.commitmentAndDue:
        return this._commitmentAndDueService;
      case ComponentsName.unFinishedOrders:
        return this._orderService;
    }
  }
}
