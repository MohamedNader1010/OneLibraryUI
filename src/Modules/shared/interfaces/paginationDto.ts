export interface PaginationDto {
    pageIndex: number; 
    isDesc: boolean; 
    keyWord: string; 
    orderByPropertyName: string; 
    length: number;
}