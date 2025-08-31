import { Component, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { catchError, of, switchMap, takeUntil, tap } from 'rxjs';
import { TranslateService } from '@ngx-translate/core';
import { UnitOfWorkService } from '../../../core/services/unit-of-work.service';
import { AuthService } from '../../../modules/authentication/services/auth.service';
import { DestroyableComponentBase } from '../../classes/destroyable-component-base.abstract';
import { LocalStorageKeys } from '../../constants/local-storage-keys.constants';
import { INavbarItems } from '../../interfaces/navbar-dropdown.interface';
import { IGetAttendanceStateByEmployeeQuery } from '../../../core/models/Attendances/queries/get-attendance-state-by-employee-query.interface';
import { ICreateFiscalYearCommand } from '../../../core/models/FiscalYears/commands/create-fiscal-year-command.interface';
import { AttendanceService } from '../../../core/services/attendance.service';

@Component({
    selector: 'app-navbar',
    templateUrl: './navbar.component.html',
    styleUrls: ['./navbar.component.css']
})
export class NavbarComponent extends DestroyableComponentBase {
    authService = inject(AuthService);
    toastrService = inject(ToastrService);
    translationService = inject(TranslateService);
    unitOfWorkService = inject(UnitOfWorkService);
    attendanceService = inject(AttendanceService);

    hasUnFinishedOrders: boolean = true;
    navItems: INavbarItems[] = [];
    isCurrentYear: boolean = false;
    isCheckedIn: boolean = false;

    baseOnInit(): void {
        this.isCurrentYear = localStorage.getItem(LocalStorageKeys.FISCAL_YEAR_IS_CURRENT) === 'true';
        this.initializeNavItems();

        this.unitOfWorkService.shift
            .getCurrent()
            .pipe(
                tap((res) => localStorage.setItem(LocalStorageKeys.SHIFT_ID, res.data.id)),
                switchMap(() => this.unitOfWorkService.authorization.getProfile()),
                tap((response) => {
                    this.authService.loggedInUserSignal.update(() => response.data);
                }),
                switchMap(() => {
                    const query: IGetAttendanceStateByEmployeeQuery = {
                        id: localStorage.getItem(LocalStorageKeys.UID) ?? ''
                    };
                    return this.unitOfWorkService.attendance.getAttendanceState(query);
                }),
                tap((res) => this.attendanceService.setAttendanceState(res.data)),
                switchMap(() => this.unitOfWorkService.order.getAllUnFinishedOrdersStatus()),
                tap((res) => (this.hasUnFinishedOrders = res.data)),
                catchError((error) => {
                    console.error(error);
                    return of(null);
                }),
                takeUntil(this.unsubscribe$)
            )
            .subscribe();

        this.attendanceService.checkedIn$.subscribe((checkedIn) => {
            this.isCheckedIn = checkedIn;
        });
    }

    initializeNavItems() {
        this.navItems = [
            {
                title: this.translationService.instant('navbar.home'),
                visible: !this.authService.isEmployee,
                routerLink: '/dashboard',
                exact: true
            },
            {
                title: this.translationService.instant('navbar.services'),
                visible: !this.authService.isEmployee,
                items: [
                    {
                        exact: true,
                        routerLink: 'services',
                        text: this.translationService.instant('navbar.services'),
                        visible: !this.authService.isEmployee
                    },
                    {
                        exact: false,
                        routerLink: 'service-types',
                        text: this.translationService.instant('navbar.serviceTypes'),
                        visible: !this.authService.isEmployee
                    }
                ]
            },
            {
                title: this.translationService.instant('navbar.clients'),
                visible: !this.authService.isEmployee,
                items: [
                    {
                        exact: true,
                        routerLink: 'clients',
                        text: this.translationService.instant('navbar.clients'),
                        visible: !this.authService.isEmployee
                    },
                    {
                        exact: false,
                        routerLink: 'client/types',
                        text: this.translationService.instant('navbar.clientTypes'),
                        visible: !this.authService.isEmployee
                    },
                    {
                        exact: false,
                        routerLink: 'client/feedback',
                        text: this.translationService.instant('navbar.clientFeedback'),
                        visible: !this.authService.isEmployee
                    }
                ]
            },
            {
                title: this.translationService.instant('navbar.teachers'),
                visible: !this.authService.isEmployee,
                items: [
                    {
                        exact: true,
                        routerLink: '/teachers',
                        text: this.translationService.instant('navbar.teachers'),
                        visible: !this.authService.isEmployee
                    }
                ]
            },
            {
                title: this.translationService.instant('navbar.suppliers'),
                visible: !this.authService.isEmployee,
                items: [
                    {
                        exact: true,
                        routerLink: 'suppliers',
                        text: this.translationService.instant('navbar.suppliers'),
                        visible: !this.authService.isEmployee
                    }
                ]
            },
            {
                title: this.translationService.instant('navbar.employees'),
                visible: !this.authService.isEmployee,
                items: [
                    {
                        exact: true,
                        routerLink: 'employees',
                        text: this.translationService.instant('navbar.employees'),
                        visible: this.authService.isAdmin
                    },
                    {
                        exact: false,
                        routerLink: 'attendance',
                        text: this.translationService.instant('navbar.attendance'),
                        visible: !this.authService.isEmployee && this.isCurrentYear
                    }
                ]
            },
            {
                title: this.translationService.instant('navbar.materials'),
                visible: !this.authService.isEmployee,
                items: [
                    {
                        exact: true,
                        routerLink: 'materials',
                        text: this.translationService.instant('navbar.materials'),
                        visible: !this.authService.isEmployee
                    },
                    {
                        exact: false,
                        routerLink: 'material-transactions',
                        text: this.translationService.instant('navbar.materialTransactions'),
                        visible: !this.authService.isEmployee
                    }
                ]
            },
            {
                title: this.translationService.instant('navbar.notes'),
                visible: !this.authService.isEmployee,
                routerLink: 'notes'
            },
            {
                title: this.translationService.instant('navbar.orders'),
                visible: true,
                items: [
                    {
                        exact: true,
                        routerLink: 'orders',
                        text: this.translationService.instant('navbar.orders'),
                        visible: true
                    },
                    {
                        exact: false,
                        routerLink: 'orders/reservations',
                        text: this.translationService.instant('navbar.reservations'),
                        visible: true
                    },
                    {
                        exact: false,
                        routerLink: 'orders/returns',
                        text: this.translationService.instant('navbar.returns'),
                        visible: true
                    },
                    {
                        exact: false,
                        routerLink: 'orders/unfinished',
                        text: this.translationService.instant('navbar.unfinishedOrders'),
                        visible: this.hasUnFinishedOrders
                    }
                ]
            },
            {
                title: this.translationService.instant('navbar.financial'),
                visible: !this.authService.isEmployee,
                items: [
                    {
                        exact: false,
                        routerLink: 'bank',
                        text: this.translationService.instant('navbar.bank'),
                        visible: this.authService.isAdmin
                    },
                    {
                        exact: false,
                        routerLink: 'shifts',
                        text: this.translationService.instant('navbar.shifts'),
                        visible: !this.authService.isEmployee
                    },
                    {
                        exact: false,
                        routerLink: 'transactions',
                        text: this.translationService.instant('navbar.transactions'),
                        visible: !this.authService.isEmployee && this.isCurrentYear
                    },
                    {
                        exact: false,
                        routerLink: 'advances',
                        text: this.translationService.instant('navbar.advances'),
                        visible: !this.authService.isEmployee
                    },
                    {
                        exact: false,
                        routerLink: 'payables',
                        text: this.translationService.instant('navbar.payables'),
                        visible: !this.authService.isEmployee
                    },
                    {
                        exact: false,
                        routerLink: 'receivables',
                        text: this.translationService.instant('navbar.receivables'),
                        visible: !this.authService.isEmployee
                    },
                    {
                        exact: false,
                        routerLink: 'operational-expenses',
                        text: this.translationService.instant('navbar.operationalExpenses'),
                        visible: !this.authService.isEmployee
                    }
                ]
            }
        ];
    }

    handleLogout() {
        this.authService.logout();
    }

    handleCheckIn() {
        this.unitOfWorkService.attendance.checkIn().subscribe({
            next: (res) => {
                this.attendanceService.checkIn();
                this.toastrService.success(res.message);
            }
        });
    }

    handleCheckOut() {
        this.unitOfWorkService.attendance.checkOut().subscribe({
            next: (res) => {
                this.attendanceService.checkOut();
                this.toastrService.success(res.message);
            }
        });
    }

    startNewFiscalYear() {
        const command: ICreateFiscalYearCommand = {
            startingBalance: 0
        };
        this.unitOfWorkService.fiscalYear.add(command).subscribe({
            next: (res) => {
                this.toastrService.success(res.message);
                // this.authService.logout();
            }
        });
    }

    baseOnDestroy(): void {
        this.unitOfWorkService.unsubscribe();
    }
}
