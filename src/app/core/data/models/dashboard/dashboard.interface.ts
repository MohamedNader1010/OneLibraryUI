export interface IDashboard {
  completedAndInCompletedOrders: OrderTotal;
  totalOrderDetailsStatus: OrderDetailsTotal;
}

interface OrderTotal {
  totalCompletedOrders: number;
  totalInCompletedOrders: number;
}

interface OrderDetailsTotal {
  totalReturnedOrders: number;
  totalPreparedOrders: number;
  totalReadyOrders: number;
  totalReservedOrders: number;
  totalReceivedOrders: number;
  totalGoneOrders: number;
}
