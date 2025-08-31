export interface IWriteOffStockCommand {
    itemId: string;
    branchId: string;
    qty: number;
    writeOffExpenseAccId: string;
}
