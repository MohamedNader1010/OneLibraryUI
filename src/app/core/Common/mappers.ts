import { CashboxType } from '../enums/cashbox-type.enum';
import { JournalDirection } from '../enums/journal-direction.enum';
import { OrderDetailStatus } from '../enums/OrderDetailStatus.enum';
import { OrderStatus } from '../enums/OrderStatus.enum';
import { PaymentMethod } from '../enums/payment-method.enum';
import { TransactionType } from '../enums/transaction-type.enum';

export const JournalDirectionMapper = new Map<JournalDirection, string>([
    [JournalDirection.Credit, 'وارد'],
    [JournalDirection.Debit, 'صادر']
]);

export const PaymentMethodMapper = new Map<PaymentMethod, string>([
    [PaymentMethod.Cash, 'نقدي'],
    [PaymentMethod.Wallet, 'محفظة'],
    [PaymentMethod.Instapay, 'Instapay']
]);

export const TransactionTypeMapper = new Map<TransactionType, string>([
    [TransactionType.EmployeeAdvance, 'سلفة موظف'],
    [TransactionType.OrderPayment, 'دفع الطلب'],
    [TransactionType.SupplierPayment, 'دفع المورد'],
    [TransactionType.TeacherPayment, 'دفع المعلم']
]);

export const TransactionSourceMapper = new Map<CashboxType, string>([
    [CashboxType.Bank, 'البنك'],
    [CashboxType.Cashbox, 'اليومية']
]);

export const OrderStatusMapper = new Map<OrderStatus, string>([
    [OrderStatus.اكتمل, 'اكتمل'],
    [OrderStatus.غير_مكتمل, 'غير مكتمل']
]);

export const OrderDetailStatusMapper = new Map<OrderDetailStatus, string>([
    [OrderDetailStatus.استلم, 'استلم'],
    [OrderDetailStatus.جاهز, 'جاهز'],
    [OrderDetailStatus.حجز, 'حجز'],
    [OrderDetailStatus.مرتجع, 'مرتجع'],
    [OrderDetailStatus.هالك, 'هالك']
]);
