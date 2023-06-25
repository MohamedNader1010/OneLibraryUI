export interface Shift {
	id: number;
  startTime: Date;
  endTime: Date|null;
  startingBalance: string|null;
  closingBalance: string;
  totalIncome: string;
  totalOutcome: string;
  createdOn: Date;
  createdBy: string|null;
}
