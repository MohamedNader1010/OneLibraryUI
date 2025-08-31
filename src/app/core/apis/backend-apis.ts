import { environment } from '../../../environments/environment';
import { OrderDetailStatus } from '../enums/OrderDetailStatus.enum';

export const BACKEND_APIs = {
    attendances: {
        root: environment.apiUrl + `attendances`,
        getStateByEmployeeId: (id: string) => `${BACKEND_APIs.attendances.root}/employee/${id}/State`,
        getAllByShiftId: (id: string) => `${BACKEND_APIs.attendances.root}/shift/${id}`,
        checkIn: () => `${BACKEND_APIs.attendances.root}/check-in`,
        checkOut: () => `${BACKEND_APIs.attendances.root}/check-out`
    },
    authorization: {
        root: environment.apiUrl + 'authorization',
        login: () => `${BACKEND_APIs.authorization.root}/login`,
        refreshToken: () => `${BACKEND_APIs.authorization.root}/refresh-token`,
        resendConfirmEmail: () => `${BACKEND_APIs.authorization.root}/email/confirmation/resend`,
        confirmEmail: () => `${BACKEND_APIs.authorization.root}/email/confirm`,
        forgetPassword: () => `${BACKEND_APIs.authorization.root}/password/forget`,
        changePassword: () => `${BACKEND_APIs.authorization.root}/password/change`,
        resetPassword: () => `${BACKEND_APIs.authorization.root}/password/reset`,
        logout: () => `${BACKEND_APIs.authorization.root}/logout`,
        profile: () => `${BACKEND_APIs.authorization.root}/profile`
    },
    clients: {
        root: environment.apiUrl + `clients`,
        getById: (id: string) => `${BACKEND_APIs.clients.root}/${id}`,
        getByClientTypeId: (id: string) => `${BACKEND_APIs.clients.root}/client-type/${id}`,
        payBulk: () => `${BACKEND_APIs.clients.root}/pay/bulk`
    },
    clientTypes: {
        root: environment.apiUrl + `client-types`
    },
    dashboard: {
        root: environment.apiUrl + `dashboard`,
        statistics: () => `${BACKEND_APIs.dashboard.root}/statistics`
    },
    employees: {
        root: environment.apiUrl + `employees`,
        activate: (id: string) => `${BACKEND_APIs.employees.root}/${id}/activate`,
        deactivate: (id: string) => `${BACKEND_APIs.employees.root}/${id}/deactivate`
    },
    feedbacks: {
        root: environment.apiUrl + `feedbacks`
    },
    fiscalYears: {
        root: environment.apiUrl + `fiscal-years`,
        current: () => `${BACKEND_APIs.fiscalYears.root}/current`,
        getById: (id: string) => `${BACKEND_APIs.fiscalYears.root}/${id}`
    },
    healthChecks: {
        root: environment.apiUrl + `health-checks`
    },
    materials: {
        root: environment.apiUrl + `materials`
    },
    materialTransactions: {
        root: environment.apiUrl + `material-transactions`,
        getAllByShiftId: (id: string) => `${BACKEND_APIs.materialTransactions.root}/shift/${id}`
    },
    notes: {
        root: environment.apiUrl + `notes`,
        clients: (id: string) => `${BACKEND_APIs.notes.root}/${id}/clients`,
        visible: () => `${BACKEND_APIs.notes.root}/visible`,
        form: () => `${BACKEND_APIs.notes.root}/form`,
        print: () => `${BACKEND_APIs.notes.root}/print`
    },
    orders: {
        root: environment.apiUrl + `orders`,
        unfinished: () => `${BACKEND_APIs.orders.root}/unfinished`,
        checkUnFinished: () => `${BACKEND_APIs.orders.root}/unfinished/status`,
        byId: (id: string) => `${BACKEND_APIs.orders.root}/${id}`,
        status: (status: OrderDetailStatus) => `${BACKEND_APIs.orders.root}/details/status/${status}`,
        payment: () => `${BACKEND_APIs.orders.root}/payment`,
        printById: (id: string) => `${BACKEND_APIs.orders.root}/print/${id}`
    },
    roles: {
        root: environment.apiUrl + `roles`
    },
    services: {
        root: environment.apiUrl + `services`,
        overview: () => `${BACKEND_APIs.services.root}/overview`,
        pricedByClientTypeId: (clientTypeId: string) => `${BACKEND_APIs.services.root}/priced/client-type/${clientTypeId}`
    },
    serviceTypes: {
        root: environment.apiUrl + `service-types`
    },
    shifts: {
        root: environment.apiUrl + `shifts`,
        getById: (id: string) => `${BACKEND_APIs.shifts.root}/${id}`,
        start: () => `${BACKEND_APIs.shifts.root}/start`,
        current: () => `${BACKEND_APIs.shifts.root}/current`
    },
    stages: {
        root: environment.apiUrl + `stages`
    },
    suppliers: {
        root: environment.apiUrl + `suppliers`
    },
    teachers: {
        root: environment.apiUrl + `teachers`,
        getById: (id: string) => `${BACKEND_APIs.teachers.root}/${id}`
    },
    terms: {
        root: environment.apiUrl + `terms`
    }
};
