/**
 * Order Service
 *
 * Fetches order data from the Spring Boot order-service
 * via the API Gateway. Falls back to mock data if the backend is offline
 * or if the user is not authenticated.
 */

import { apiFetch } from './api';
import { Order } from './types';
import { MOCK_ORDERS } from './mockData';

// ---------------------------------------------------------------------------
// Response shape mapper (backend → frontend type)
// ---------------------------------------------------------------------------

function mapOrder(raw: any): Order {
  return {
    id: raw.id ?? raw._id ?? raw.orderId ?? '',
    customerName: raw.customerName ?? raw.customer?.name ?? '',
    customerEmail: raw.customerEmail ?? raw.customer?.email ?? '',
    shippingAddress: {
      fullName: raw.shippingAddress?.fullName ?? raw.customerName ?? '',
      street: raw.shippingAddress?.street ?? raw.shippingAddress?.addressLine1 ?? '',
      city: raw.shippingAddress?.city ?? '',
      state: raw.shippingAddress?.state ?? '',
      zipCode: raw.shippingAddress?.zipCode ?? raw.shippingAddress?.pinCode ?? '',
      phone: raw.shippingAddress?.phone ?? '',
    },
    subOrders: Array.isArray(raw.subOrders)
      ? raw.subOrders.map((sub: any) => ({
          vendorId: sub.vendorId ?? '',
          vendorName: sub.vendorName ?? '',
          items: Array.isArray(sub.items)
            ? sub.items.map((item: any) => ({
                product: item.product ?? item,
                quantity: item.quantity ?? 1,
              }))
            : [],
          subtotal: sub.subtotal ?? 0,
          status: sub.status ?? 'Placed',
          trackingNumber: sub.trackingNumber ?? '',
          estimatedDelivery: sub.estimatedDelivery ?? '',
        }))
      : [],
    grandTotal: raw.grandTotal ?? raw.totalAmount ?? 0,
    deliveryFee: raw.deliveryFee ?? raw.shippingFee ?? 0,
    orderDate: raw.orderDate ?? raw.createdAt ?? '',
    paymentStatus: raw.paymentStatus ?? 'Pending',
    paymentMethod: raw.paymentMethod ?? '',
    globalStatus: raw.globalStatus ?? raw.status ?? 'Placed',
  };
}

// ---------------------------------------------------------------------------
// API functions with graceful fallback
// ---------------------------------------------------------------------------

/**
 * Fetch orders for the authenticated customer.
 * Falls back to MOCK_ORDERS if backend is unreachable.
 */
export async function fetchMyOrders(): Promise<Order[]> {
  try {
    const data = await apiFetch<any>('/api/v1/orders/my-orders');
    const list = Array.isArray(data) ? data : data?.content ?? data?.orders ?? [];
    return list.map(mapOrder);
  } catch (error) {
    console.info('[orderService] Backend unavailable, using mock orders.', error);
    return MOCK_ORDERS;
  }
}

/**
 * Fetch all orders (vendor or admin view).
 */
export async function fetchAllOrders(): Promise<Order[]> {
  try {
    const data = await apiFetch<any>('/api/v1/orders');
    const list = Array.isArray(data) ? data : data?.content ?? data?.orders ?? [];
    return list.map(mapOrder);
  } catch (error) {
    console.info('[orderService] Backend unavailable for all orders, using mock.', error);
    return MOCK_ORDERS;
  }
}

/**
 * Update the status of a sub-order (vendor fulfillment action).
 * Optimistic update — returns success even if backend is offline so UI can update locally.
 */
export async function updateSubOrderStatusApi(
  orderId: string,
  vendorId: string,
  status: string
): Promise<{ success: boolean }> {
  try {
    await apiFetch<any>(`/api/v1/orders/${orderId}/sub-orders/${vendorId}/status`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    });
    return { success: true };
  } catch (error) {
    console.info('[orderService] Backend unavailable for status update. Updating UI locally.', error);
    return { success: true }; // allow optimistic UI update
  }
}
