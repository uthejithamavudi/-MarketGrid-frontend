/**
 * Order Service
 *
 * Fetches order data from the Spring Boot order-service
 * via the API Gateway. Throws on failure — no mock fallback.
 */

import { apiFetch } from './api';
import { Order } from './types';

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
// API functions — no mock fallback
// ---------------------------------------------------------------------------

/**
 * Fetch orders for the authenticated customer.
 * Throws if backend is unreachable.
 */
export async function fetchMyOrders(): Promise<Order[]> {
  const data = await apiFetch<any>('/api/v1/orders/my-orders');
  const list = Array.isArray(data) ? data : data?.content ?? data?.orders ?? [];
  return list.map(mapOrder);
}

/**
 * Fetch all orders (vendor or admin view).
 * Throws if backend is unreachable.
 */
export async function fetchAllOrders(): Promise<Order[]> {
  const data = await apiFetch<any>('/api/v1/orders');
  const list = Array.isArray(data) ? data : data?.content ?? data?.orders ?? [];
  return list.map(mapOrder);
}

/**
 * Update the status of a sub-order (vendor fulfillment action).
 * Returns failure status if backend is down.
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
    console.error('[orderService] Status update failed:', error);
    return { success: false };
  }
}
