export interface IPagingCriteria {
  pageIndex: number;
  pageSize: number;
  direction: string;
  orderBy: string;
  filters: { [key: string]: string };
}
