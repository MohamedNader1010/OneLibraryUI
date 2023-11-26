export interface DashboardData {
  completedAndInCompletedOrders: OrderTotal; 
  totalOrderDetailsStatus: OrderDetailsTotal;
}

interface OrderTotal {
  totalCompletedOrders: KeyValuePairs<string, number>;
  totalInCompletedOrders: KeyValuePairs<string, number>;
}

interface OrderDetailsTotal {
  totalReturnedOrders: KeyValuePairs<string, number>;
  totalPreparedOrders: KeyValuePairs<string, number>;
  totalReadyOrders: KeyValuePairs<string, number>;
  totalReservedOrders: KeyValuePairs<string, number>; 
  totalReceivedOrders: KeyValuePairs<string, number>;
  totalGoneOrders: KeyValuePairs<string, number>;
}
interface KeyValuePairs<TKey, TValue> {
  key: TKey;
  value: TValue;
}
