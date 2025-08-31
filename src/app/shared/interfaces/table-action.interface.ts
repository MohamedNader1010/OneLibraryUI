import { TableActionPosition } from '../enums/table-action-position.enum';

export interface ITableAction {
    action: (element: any, data?: any) => void;
    condition: (forCurrentYearOnly: boolean, row: any) => boolean;
    icon: string;
    tooltip: string;
    position: TableActionPosition;
}
