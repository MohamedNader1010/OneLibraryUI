import { ClientTypeService } from 'src/app/core/data/project-management/repositories/clientType.service';
import { ComponentsName } from 'src/app/shared/enums/components.name.enum';
import { AttendanceService } from 'src/app/core/data/project-management/repositories/attendance.service';
import { Injectable } from '@angular/core';
import { MaterialService } from 'src/app/core/data/project-management/repositories/material.service';
import { ClientService } from 'src/app/core/data/project-management/repositories/client.service';
import { FeedbackService } from 'src/app/core/data/project-management/repositories/feedback.service';
import { IncomesOutcomesService } from 'src/app/core/data/project-management/repositories/Incomes-outcomes.service';
import { MaterialTrackingService } from 'src/app/core/data/project-management/repositories/materialTracking.service';
import { NoteService } from 'src/app/core/data/project-management/repositories/note.service';
import { OrderService } from 'src/app/core/data/project-management/repositories/orders.service';
import { ServicesService } from 'src/app/core/data/project-management/repositories/services.service';
import { ServicesTypeService } from 'src/app/core/data/project-management/repositories/serviceType.service';
import { ServicePricePerClientTypeService } from 'src/app/core/data/project-management/repositories/service-price-per-client-type.service';
import { EmployeeService } from 'src/app/core/data/project-management/repositories/employee.service';
import { ShiftService } from '../../core/data/project-management/repositories/shift.service';
import { BankService } from '../../core/data/project-management/repositories/bank.service';
import { SupplierService } from '../../core/data/project-management/repositories/supplier.service';
import { CommitmentAndDueService } from '../../core/data/project-management/repositories/commitment-and-due.service';

@Injectable({
  providedIn: 'root',
})
export class ServiceFactory {
  constructor(
    private _materialService: MaterialService,
    private _attendnaceService: AttendanceService,
    private _clientService: ClientService,
    private _feedbackService: FeedbackService,
    private _incomeOutcomeService: IncomesOutcomesService,
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
    }
  }
}
