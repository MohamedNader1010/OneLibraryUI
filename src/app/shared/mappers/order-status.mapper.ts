import { OrderStatus } from '../enums/OrderStatus.enum';

export const OrderStatusMapper = new Map<OrderStatus, string>([
  [OrderStatus.اكتمل, 'اكتمل'],
  [OrderStatus.غير_مكتمل, 'غير مكتمل'],
]);
