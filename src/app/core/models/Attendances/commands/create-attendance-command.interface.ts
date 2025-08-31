export interface ICreateAttendanceCommand {
  employeeId: string;
  checkIn: Date;
  checkOut?: Date;
  comment: string;
}
