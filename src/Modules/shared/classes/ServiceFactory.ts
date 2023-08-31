import {ClientTypeService} from 'src/Modules/clientType/services/clientType.service';
import {ComponentsName} from 'src/Persistents/enums/components.name';
import {AttendanceService} from 'src/Modules/attendance/services/attendance.service';
import {Injectable} from '@angular/core';
import {MaterialService} from 'src/Modules/material/services/material.service';
import {ClientService} from 'src/Modules/client/services/client.service';
import {FeedbackService} from 'src/Modules/feadback/services/feedback.service';
import {IncomesOutcomesService} from 'src/Modules/incomes-outcomes/services/Incomes-outcomes.service';
import {MaterialTrackingService} from 'src/Modules/material-tracking/services/materialTracking.service';
import {NoteService} from 'src/Modules/note/services/note.service';
import {OrderService} from 'src/Modules/order/services/orders.service';
import {ServicesService} from 'src/Modules/service/services/services.service';
import {ServicesTypeService} from 'src/Modules/serviceType/services/serviceType.service';
import {ServicePricePerClientTypeService} from 'src/Modules/service-price-per-client-type/services/service-price-per-client-type.service';
import {EmployeeService} from 'src/Modules/employee/services/employee.service';
import { ShiftService } from "../../incomes-outcomes/services/shift.service"
import { BankService } from './../../bank/services/bank.service';
import { SupplierService } from '../../supplier/services/supplier.service';

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
    }
  }
}
