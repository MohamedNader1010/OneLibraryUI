import { OrderDetailStatus } from '../enums/OrderDetailStatus.enum';

export const OrderDetailStatusMapper = new Map<OrderDetailStatus, string>([
  [OrderDetailStatus.استلم, 'استلم'],
  [OrderDetailStatus.جاهز, 'جاهز'],
  [OrderDetailStatus.حجز, 'حجز'],
  [OrderDetailStatus.مرتجع, 'مرتجع'],
  [OrderDetailStatus.هالك, 'هالك'],
]);
