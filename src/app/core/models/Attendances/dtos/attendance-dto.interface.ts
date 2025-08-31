export interface IAttendanceDTO {
  id?: string;
  employeeId: string;
  employeeName: string;
  comment: string;
  defaultWorkingHours: string; // TimeSpan as string
  checkIn: Date;
  checkOut?: Date;
  duration?: string;
  formattedDuration?: string;
  formattedDefaultWorkingHours?: string;
  formattedWorkingHours?: string;
  formattedOverTime?: string;
}
