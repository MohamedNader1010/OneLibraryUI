export interface ITableMetaData {
    data: any[];
    totalCount: number;
    filteredCount: number;
    pageSize: number;
    currentPage: number;
    sortColumn: string;
    sortDirection: 'asc' | 'desc' | '';
}
