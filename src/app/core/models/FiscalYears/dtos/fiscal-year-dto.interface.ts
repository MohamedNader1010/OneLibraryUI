export interface IFiscalYearDTO {
  id: string;
  startDate: Date;
  endDate?: Date;
  startingBalance: number;
  isClosed: boolean;
  isCurrent: boolean;
}
