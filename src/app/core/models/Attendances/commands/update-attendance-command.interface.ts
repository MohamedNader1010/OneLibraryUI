export interface IUpdateAttendanceCommand {
  id: string;
  checkIn: Date;
  checkOut?: Date;
  comment: string;
}
