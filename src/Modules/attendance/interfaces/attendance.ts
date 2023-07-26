export interface Attendance {
	id: number;
	checkIn: Date;
	checkOut: Date;
	employeeId: string;
	employee: string;
  duration: string;
  formattedDuration: string;
}
