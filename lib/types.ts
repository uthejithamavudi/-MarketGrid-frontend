export type UserRole = 'customer' | 'vendor' | 'admin';

export interface Vendor {
  id: string;
  name: string;
  slug: string;
  logo: string;
  coverImage: string;
  rating: number;
  reviewsCount: number;
  verified: boolean;
  tagline: string;
  description: string;
  joinedDate: string;
  totalProducts: number;
  totalOrders: number;
  totalRevenue: string;
  ownerName: string;
  ownerEmail: string;
  phone?: string;
  businessType?: 'Sole Proprietorship' | 'Private Limited' | 'Partnership' | 'LLP';
  gstin?: string;
  panNumber?: string;
  aadhaarNumber?: string;
  addressStreet?: string;
  city?: string;
  state?: string;
  zipCode?: string;
  bankAccountHolder?: string;
  bankName?: string;
  accountNumber?: string;
  ifscCode?: string;
  status: 'ACTIVE' | 'PENDING' | 'SUSPENDED' | 'REJECTED';
}

export interface Category {
  id: string;
  name: string;
  slug: string;
  image: string;
  description: string;
  subcategories: string[];
  productCount: number;
}

export interface ProductVariant {
  id: string;
  name: string;
  options: string[];
  priceOffset?: number;
}

export interface Product {
  id: string;
  name: string;
  slug: string;
  vendorId: string;
  vendorName: string;
  vendorSlug: string;
  categoryId: string;
  categoryName: string;
  subcategory: string;
  price: number;
  originalPrice?: number;
  discountPercentage?: number;
  rating: number;
  reviewCount: number;
  images: string[];
  description: string;
  specifications: Record<string, string>;
  stock: number;
  sku: string;
  isFeatured?: boolean;
  isNew?: boolean;
  status: 'Active' | 'Draft' | 'Low Stock' | 'Out of Stock';
  variants?: ProductVariant[];
  weight?: string;
  dimensions?: string;
}

export interface CartItem {
  product: Product;
  quantity: number;
  selectedVariant?: string;
}

export interface MultiVendorSubOrder {
  vendorId: string;
  vendorName: string;
  items: CartItem[];
  subtotal: number;
  status: 'Confirmed' | 'Packed' | 'Shipped' | 'Out for Delivery' | 'Delivered';
  trackingNumber: string;
  estimatedDelivery: string;
}

export interface Order {
  id: string;
  customerName: string;
  customerEmail: string;
  shippingAddress: {
    fullName: string;
    street: string;
    city: string;
    state: string;
    zipCode: string;
    phone: string;
  };
  subOrders: MultiVendorSubOrder[];
  grandTotal: number;
  deliveryFee: number;
  orderDate: string;
  paymentStatus: 'Paid' | 'Pending' | 'Failed';
  paymentMethod: string;
  globalStatus: 'Processing' | 'Partially Shipped' | 'Shipped' | 'Delivered';
}

export interface ToastMessage {
  id: string;
  title: string;
  description?: string;
  type?: 'success' | 'error' | 'warning' | 'info';
}
