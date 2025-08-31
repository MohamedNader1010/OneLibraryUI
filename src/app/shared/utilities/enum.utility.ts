import {
    JournalDirectionMapper,
    PaymentMethodMapper,
    TransactionTypeMapper,
    TransactionSourceMapper,
    OrderStatusMapper,
    OrderDetailStatusMapper
} from '../../core/Common/mappers';
import { AccountType } from '../../core/enums/account-type.enum';
import { CashboxType } from '../../core/enums/cashbox-type.enum';
import { EmployeeStatus } from '../../core/enums/employee-status.enum';
import { JournalDirection } from '../../core/enums/journal-direction.enum';
import { MaterialTransactionType } from '../../core/enums/material-transaction-type.enum';
import { OrderDetailStatus } from '../../core/enums/OrderDetailStatus.enum';
import { OrderStatus } from '../../core/enums/OrderStatus.enum';
import { PaymentMethod } from '../../core/enums/payment-method.enum';
import { Roles } from '../../core/enums/roles.enum';
import { TransactionType } from '../../core/enums/transaction-type.enum';

export const getEnumValues = <T extends (typeof enums)[keyof typeof enums]>(enumObj: T): Array<T[keyof T]> =>
    Object.values(enumObj) as Array<T[keyof T]>;

export const enums = {
    accountTypes: AccountType,
    cashboxTypes: CashboxType,
    employeeStatus: EmployeeStatus,
    journalDirection: JournalDirection,
    materialTransactionType: MaterialTransactionType,
    orderDetailStatus: OrderDetailStatus,
    orderStatus: OrderStatus,
    paymentMethod: PaymentMethod,
    roles: Roles,
    transactionType: TransactionType
};

export const mappers = {
    JournalDirection: JournalDirectionMapper,
    PaymentMethod: PaymentMethodMapper,
    TransactionType: TransactionTypeMapper,
    TransactionSource: TransactionSourceMapper,
    OrderStatus: OrderStatusMapper,
    OrderDetailStatus: OrderDetailStatusMapper
};
