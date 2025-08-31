import { inject, Injectable, Injector } from '@angular/core';
import { AttendanceRepository } from '../repositories/attendance.repository';
import { ClientTypeRepository } from '../repositories/client-type.repository';
import { ClientRepository } from '../repositories/client.repository';
import { DashboardRepository } from '../repositories/dashboard.repository';
import { EmployeeRepository } from '../repositories/employee.repository';
import { FeedbackRepository } from '../repositories/feedback.repository';
import { FiscalYearRepository } from '../repositories/fiscal-year.repository';
import { NoteRepository } from '../repositories/note.repository';
import { OrderRepository } from '../repositories/order.repository';
import { ServiceTypeRepository } from '../repositories/service-type.repository';
import { ServiceRepository } from '../repositories/service.repository';
import { StageRepository } from '../repositories/stage.repository';
import { SupplierRepository } from '../repositories/supplier.repository';
import { TermRepository } from '../repositories/term.repository';
import { ShiftRepository } from '../repositories/shift.repository';
import { AuthorizationRepository } from '../repositories/authorization.repository';
import { MaterialTransactionRepository } from '../repositories/material-transaction.repository';
import { BranchStockRepository } from '../repositories/branch-stock.repository';
import { TeacherRepository } from '../repositories/teacher.repository';

@Injectable({ providedIn: 'root' })
export class UnitOfWorkService {
    injector = inject(Injector);

    get attendance() {
        return this.injector.get(AttendanceRepository);
    }

    get authorization() {
        return this.injector.get(AuthorizationRepository);
    }

    get clientType() {
        return this.injector.get(ClientTypeRepository);
    }

    get client() {
        return this.injector.get(ClientRepository);
    }

    get dashboard() {
        return this.injector.get(DashboardRepository);
    }

    get employee() {
        return this.injector.get(EmployeeRepository);
    }

    get feedback() {
        return this.injector.get(FeedbackRepository);
    }

    get fiscalYear() {
        return this.injector.get(FiscalYearRepository);
    }

    get branchStockRepository() {
        return this.injector.get(BranchStockRepository);
    }

    get materialTransactions() {
        return this.injector.get(MaterialTransactionRepository);
    }

    get note() {
        return this.injector.get(NoteRepository);
    }

    get order() {
        return this.injector.get(OrderRepository);
    }

    get serviceType() {
        return this.injector.get(ServiceTypeRepository);
    }

    get service() {
        return this.injector.get(ServiceRepository);
    }

    get shift() {
        return this.injector.get(ShiftRepository);
    }

    get stage() {
        return this.injector.get(StageRepository);
    }

    get supplier() {
        return this.injector.get(SupplierRepository);
    }

    get teacher() {
        return this.injector.get(TeacherRepository);
    }

    get term() {
        return this.injector.get(TermRepository);
    }

    unsubscribe() {
        this.attendance.unsubscribe();
        this.authorization.unsubscribe();
        this.clientType.unsubscribe();
        this.client.unsubscribe();
        this.dashboard.unsubscribe();
        this.employee.unsubscribe();
        this.feedback.unsubscribe();
        this.fiscalYear.unsubscribe();
        // this.material.unsubscribe();
        this.note.unsubscribe();
        this.order.unsubscribe();
        this.serviceType.unsubscribe();
        this.service.unsubscribe();
        this.shift.unsubscribe();
        this.stage.unsubscribe();
        this.supplier.unsubscribe();
        this.teacher.unsubscribe();
        this.term.unsubscribe();
    }
}
