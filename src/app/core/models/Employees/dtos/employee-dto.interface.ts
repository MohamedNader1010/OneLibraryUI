import { EmployeeStatus } from '../../../enums/employee-status.enum';

export interface IEmployeeDTO {
    id: string;
    userName?: string;
    firstName: string;
    lastName: string;
    fullName: string;
    email?: string;
    emailConfirmed: boolean;
    phoneNumber?: string;
    status: EmployeeStatus;
    title?: string;
    position?: string;
    monthlyAdvanceLimit: number;
    defaultWorkingHours: string; // TimeSpan as string
}
