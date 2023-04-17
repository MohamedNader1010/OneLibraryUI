import {ClientTypeService} from 'src/Modules/clientType/services/clientType.service';
import {ComponentsName} from 'src/Persistents/enums/components.name';
import {AttendanceService} from 'src/Modules/attendance/services/attendance.service';
import {Injectable} from '@angular/core';
import {MaterialService} from 'src/Modules/material/services/material.service';
import {ClientService} from 'src/Modules/client/services/client.service';
import {FeadbackService} from 'src/Modules/feadback/services/feadback.service';
import {IncomesOutcomesService} from 'src/Modules/incomes-outcomes/services/Incomes-outcomes.service';
import {MaterialTrackingService} from 'src/Modules/material-tracking/services/materialTracking.service';
import {NoteService} from 'src/Modules/note/services/note.service';
import {OrderService} from 'src/Modules/order/services/orders.service';
import {ServicesService} from 'src/Modules/service/services/services.service';
import {ServicesTypeService} from 'src/Modules/serviceType/services/serviceType.service';
import {ServicePricePerClientTypeService} from 'src/Modules/service-price-per-client-type/services/service-price-per-client-type.service';
import { EmployeeService } from 'src/Modules/employee/services/employee.service';

@Injectable({
	providedIn: 'root',
})
export class ServiceFactory {
	constructor(
		private materialService: MaterialService,
		private attendnaceService: AttendanceService,
		private clientService: ClientService,
		private feedbackService: FeadbackService,
		private incomeOutcomeService: IncomesOutcomesService,
		private materialTrackingService: MaterialTrackingService,
		private noteService: NoteService,
		private orderService: OrderService,
		private serviceService: ServicesService,
		private clientTypeService: ClientTypeService,
		private serviceTypeService: ServicesTypeService,
		private servicePricePerClientTypeService: ServicePricePerClientTypeService ,
		private employeeService: EmployeeService
	) {}

	getService(componentName: ComponentsName) {
		switch (componentName) {
			case ComponentsName.material:
				return this.materialService;
			case ComponentsName.attendance:
				return this.attendnaceService;
			case ComponentsName.client:
				return this.clientService;
			case ComponentsName.clientType:
				return this.clientTypeService;
			case ComponentsName.feedback:
				return this.feedbackService;
			case ComponentsName.incomeOutcome:
				return this.incomeOutcomeService;
			case ComponentsName.materialTracking:
				return this.materialTrackingService;
			case ComponentsName.note:
				return this.noteService;
			case ComponentsName.order:
				return this.orderService;
			case ComponentsName.service:
				return this.serviceService;
			case ComponentsName.serviceType:
				return this.serviceTypeService;
			case ComponentsName.servicePricePerClientType:
				return this.servicePricePerClientTypeService;
			case ComponentsName.employee: 
				return this.employeeService
		}
	}
}
