export interface IUpdateEmployeeCommand {
  id: string;
  userName: string;
  firstName: string;
  lastName: string;
  email: string;
  phoneNumber: string;
  title: string;
  position: string;
  monthlyAdvanceLimit: number;
  defaultWorkingHours: string; // TimeSpan as string
}
