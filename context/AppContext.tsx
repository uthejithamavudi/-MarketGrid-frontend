'use client';

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { Product, CartItem, UserRole, Order, ToastMessage, Vendor, Category } from '@/lib/types';
import { sendOtpApi, verifyOtpApi, sendVendorStatusEmailApi } from '@/lib/authService';
import { fetchProducts, fetchCategories } from '@/lib/productService';
import { fetchVendors, registerVendorApi, updateVendorStatusApi } from '@/lib/vendorService';
import { fetchMyOrders, fetchAllOrders, updateSubOrderStatusApi } from '@/lib/orderService';
import { storeToken, clearToken, getStoredToken } from '@/lib/api';

interface CartVendorGroup {
  vendorId: string;
  vendorName: string;
  items: CartItem[];
  subtotal: number;
}

export interface PendingOtpUser {
  email: string;
  role: UserRole;
  demoCode?: string;
}

interface AppContextType {
  role: UserRole;
  setRole: (role: UserRole) => void;
  isAuthenticated: boolean;
  userEmail: string | null;
  authToken: string | null;
  pendingOtpUser: PendingOtpUser | null;
  setPendingOtpUser: (user: PendingOtpUser | null) => void;
  initiateOtpAuth: (email: string, targetRole: UserRole) => Promise<boolean>;
  verifyOtpCode: (otpCode: string, targetRole?: UserRole, email?: string) => Promise<boolean>;
  resendOtpCode: () => Promise<boolean>;
  login: (email: string, pass: string, role: UserRole) => void;
  logout: () => void;
  cart: CartItem[];
  addToCart: (product: Product, quantity?: number, variant?: string) => void;
  removeFromCart: (productId: string) => void;
  updateCartQuantity: (productId: string, delta: number) => void;
  clearCart: () => void;
  cartByVendor: CartVendorGroup[];
  cartCount: number;
  cartSubtotal: number;
  cartDeliveryFee: number;
  cartGrandTotal: number;
  wishlist: string[];
  toggleWishlist: (productId: string) => void;
  isWishlisted: (productId: string) => boolean;
  orders: Order[];
  updateSubOrderStatus: (orderId: string, vendorId: string, status: 'Confirmed' | 'Packed' | 'Shipped' | 'Out for Delivery' | 'Delivered') => void;
  toasts: ToastMessage[];
  showToast: (title: string, description?: string, type?: 'success' | 'error' | 'warning' | 'info') => void;
  removeToast: (id: string) => void;
  isCartOpen: boolean;
  setIsCartOpen: (open: boolean) => void;
  vendorsList: Vendor[];
  registerVendor: (vendorData: Partial<Vendor> & { name: string; ownerName: string; ownerEmail: string }) => void;
  approveVendor: (vendorId: string) => void;
  rejectVendor: (vendorId: string) => void;
  suspendVendor: (vendorId: string) => void;
  deleteVendor: (vendorId: string) => void;
  productsList: Product[];
  categoriesList: Category[];
  addProduct: (product: Omit<Product, 'id'>) => void;
  toggleProductStatus: (productId: string) => void;
  isLoadingData: boolean;
  hasError: boolean;
  errorMessage: string;
  retryLoadData: () => void;
}

const AppContext = createContext<AppContextType | undefined>(undefined);

export const AppProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<UserRole>('customer');
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [userEmail, setUserEmail] = useState<string | null>(null);
  const [authToken, setAuthToken] = useState<string | null>(null);
  const [pendingOtpUser, setPendingOtpUser] = useState<PendingOtpUser | null>(null);

  // Empty cart on startup — no mock pre-fills
  const [cart, setCart] = useState<CartItem[]>([]);
  // Empty wishlist on startup
  const [wishlist, setWishlist] = useState<string[]>([]);
  const [orders, setOrders] = useState<Order[]>([]);
  const [toasts, setToasts] = useState<ToastMessage[]>([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [vendorsList, setVendorsList] = useState<Vendor[]>([]);
  const [productsList, setProductsList] = useState<Product[]>([]);
  const [categoriesList, setCategoriesList] = useState<Category[]>([]);
  const [isLoadingData, setIsLoadingData] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');

  // ---------------------------------------------------------------------------
  // Toast helpers (defined early so they can be used in effects below)
  // ---------------------------------------------------------------------------

  const showToast = useCallback((
    title: string,
    description?: string,
    type: 'success' | 'error' | 'warning' | 'info' = 'success'
  ) => {
    const id = Math.random().toString(36).substring(2, 9);
    setToasts((prev) => [...prev, { id, title, description, type }]);
    setTimeout(() => {
      setToasts((prev) => prev.filter((t) => t.id !== id));
    }, 4500);
  }, []);

  const removeToast = useCallback((id: string) => {
    setToasts((prev) => prev.filter((t) => t.id !== id));
  }, []);

  // ---------------------------------------------------------------------------
  // Data loading — fully backend-dependent, no mock fallback
  // ---------------------------------------------------------------------------

  const loadInitialData = useCallback(async () => {
    setIsLoadingData(true);
    setHasError(false);
    setErrorMessage('');

    // Use allSettled so one failing service doesn't block the others
    const [productsResult, categoriesResult, vendorsResult] = await Promise.allSettled([
      fetchProducts(),
      fetchCategories(),
      fetchVendors(),
    ]);

    // Handle each result independently
    if (productsResult.status === 'fulfilled') {
      setProductsList(productsResult.value);
    } else {
      console.warn('[AppContext] Products fetch failed:', productsResult.reason);
      setProductsList([]);
    }

    if (categoriesResult.status === 'fulfilled') {
      setCategoriesList(categoriesResult.value);
    } else {
      console.warn('[AppContext] Categories fetch failed:', categoriesResult.reason);
      setCategoriesList([]);
    }

    if (vendorsResult.status === 'fulfilled') {
      setVendorsList(vendorsResult.value);
    } else {
      console.warn('[AppContext] Vendors fetch failed:', vendorsResult.reason);
      setVendorsList([]);
    }

    // Only set full error state if ALL three failed
    const allFailed = productsResult.status === 'rejected'
      && categoriesResult.status === 'rejected'
      && vendorsResult.status === 'rejected';

    if (allFailed) {
      setHasError(true);
      const firstError = (productsResult as PromiseRejectedResult).reason;
      setErrorMessage(firstError?.message || 'Unable to connect to MarketGrid backend.');
    }

    setIsLoadingData(false);
  }, []);

  const retryLoadData = useCallback(() => {
    loadInitialData();
  }, [loadInitialData]);

  // ---------------------------------------------------------------------------
  // On mount: restore token from localStorage + load data from backend
  // ---------------------------------------------------------------------------

  useEffect(() => {
    const storedToken = getStoredToken();
    if (storedToken) {
      setAuthToken(storedToken);
      // Restore authenticated session state
      const storedEmail = localStorage.getItem('mg_user_email');
      const storedRole = localStorage.getItem('mg_user_role') as UserRole | null;
      if (storedEmail) setUserEmail(storedEmail);
      if (storedRole) setRole(storedRole);
      setIsAuthenticated(true);
    }

    loadInitialData();
  }, [loadInitialData]);

  // ---------------------------------------------------------------------------
  // Load orders when user is authenticated
  // ---------------------------------------------------------------------------

  useEffect(() => {
    if (!isAuthenticated) {
      setOrders([]);
      return;
    }

    const loadOrders = async () => {
      try {
        // Vendor/Admin see all orders; customer sees only their own
        const loaded = role === 'customer'
          ? await fetchMyOrders()
          : await fetchAllOrders();
        setOrders(loaded);
      } catch (error: any) {
        console.error('[AppContext] Failed to load orders:', error);
        setOrders([]);
      }
    };

    loadOrders();
  }, [isAuthenticated, role]);

  // ---------------------------------------------------------------------------
  // Auth
  // ---------------------------------------------------------------------------

  const login = (email: string, pass: string, targetRole: UserRole) => {
    setIsAuthenticated(true);
    setRole(targetRole);
    setUserEmail(email);
    if (typeof window !== 'undefined') {
      localStorage.setItem('mg_user_email', email);
      localStorage.setItem('mg_user_role', targetRole);
    }
    showToast(`Authenticated as ${targetRole.toUpperCase()}`, `Signed in as ${email}`, 'success');
  };

  const logout = () => {
    setIsAuthenticated(false);
    setRole('customer');
    setUserEmail(null);
    setAuthToken(null);
    setOrders([]);
    clearToken();
    if (typeof window !== 'undefined') {
      localStorage.removeItem('mg_user_email');
      localStorage.removeItem('mg_user_role');
    }
    showToast('Signed Out', 'You have been logged out of your session.', 'info');
  };

  const initiateOtpAuth = async (email: string, targetRole: UserRole): Promise<boolean> => {
    setPendingOtpUser({ email, role: targetRole, demoCode: '123456' });
    const res = await sendOtpApi({ email, role: targetRole, purpose: 'login' });
    if (res.success) {
      showToast('OTP Sent', res.message, 'info');
      return true;
    } else {
      showToast('OTP Request Failed', res.message, 'error');
      return false;
    }
  };

  const verifyOtpCode = async (otpCode: string, targetRole?: UserRole, email?: string): Promise<boolean> => {
    const activeRole = targetRole || pendingOtpUser?.role || role || 'customer';
    const activeEmail = email || pendingOtpUser?.email || userEmail || 'user@marketgrid.io';

    const res = await verifyOtpApi({ email: activeEmail, otpCode, role: activeRole });
    if (res.success) {
      setIsAuthenticated(true);
      setRole(activeRole);
      setUserEmail(activeEmail);
      setPendingOtpUser(null);

      // Store JWT token if provided by backend
      if (res.token) {
        setAuthToken(res.token);
        storeToken(res.token);
      }

      if (typeof window !== 'undefined') {
        localStorage.setItem('mg_user_email', activeEmail);
        localStorage.setItem('mg_user_role', activeRole);
      }

      showToast(`Verification Successful`, `Logged in as ${activeRole.toUpperCase()} (${activeEmail})`, 'success');
      return true;
    } else {
      showToast('Verification Failed', res.message, 'error');
      return false;
    }
  };

  const resendOtpCode = async (): Promise<boolean> => {
    if (!pendingOtpUser) {
      showToast('No active OTP session', 'Please restart login or OTP flow.', 'warning');
      return false;
    }
    return initiateOtpAuth(pendingOtpUser.email, pendingOtpUser.role);
  };

  // ---------------------------------------------------------------------------
  // Cart
  // ---------------------------------------------------------------------------

  const addToCart = (product: Product, quantity: number = 1, variant?: string) => {
    setCart((prev) => {
      const existingIndex = prev.findIndex((item) => item.product.id === product.id);
      if (existingIndex > -1) {
        const updated = [...prev];
        updated[existingIndex].quantity += quantity;
        return updated;
      }
      return [...prev, { product, quantity, selectedVariant: variant }];
    });
    showToast('Added to Cart', `${product.name} is now in your cart.`, 'success');
  };

  const removeFromCart = (productId: string) => {
    setCart((prev) => prev.filter((item) => item.product.id !== productId));
    showToast('Item Removed', 'Product removed from your cart.', 'info');
  };

  const updateCartQuantity = (productId: string, delta: number) => {
    setCart((prev) =>
      prev
        .map((item) => {
          if (item.product.id === productId) {
            const newQty = item.quantity + delta;
            return newQty > 0 ? { ...item, quantity: newQty } : null;
          }
          return item;
        })
        .filter(Boolean) as CartItem[]
    );
  };

  const clearCart = () => setCart([]);

  const cartByVendor = React.useMemo(() => {
    const groups: Record<string, CartVendorGroup> = {};
    cart.forEach((item) => {
      const vId = item.product.vendorId;
      const vName = item.product.vendorName;
      if (!groups[vId]) {
        groups[vId] = { vendorId: vId, vendorName: vName, items: [], subtotal: 0 };
      }
      groups[vId].items.push(item);
      groups[vId].subtotal += item.product.price * item.quantity;
    });
    return Object.values(groups);
  }, [cart]);

  const cartCount = cart.reduce((sum, item) => sum + item.quantity, 0);
  const cartSubtotal = cart.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const cartDeliveryFee = cart.length > 0 ? 100 : 0;
  const cartGrandTotal = cartSubtotal + cartDeliveryFee;

  // ---------------------------------------------------------------------------
  // Wishlist
  // ---------------------------------------------------------------------------

  const toggleWishlist = (productId: string) => {
    setWishlist((prev) => {
      if (prev.includes(productId)) {
        showToast('Removed from Wishlist', undefined, 'info');
        return prev.filter((id) => id !== productId);
      } else {
        showToast('Saved to Wishlist', 'Product added to your saved wishlist.', 'success');
        return [...prev, productId];
      }
    });
  };

  const isWishlisted = (productId: string) => wishlist.includes(productId);

  // ---------------------------------------------------------------------------
  // Orders
  // ---------------------------------------------------------------------------

  const updateSubOrderStatus = (
    orderId: string,
    vendorId: string,
    status: 'Confirmed' | 'Packed' | 'Shipped' | 'Out for Delivery' | 'Delivered'
  ) => {
    // Optimistic update — also fires API call in background
    setOrders((prev) =>
      prev.map((order) => {
        if (order.id === orderId) {
          const updatedSubOrders = order.subOrders.map((sub) =>
            sub.vendorId === vendorId ? { ...sub, status } : sub
          );
          return { ...order, subOrders: updatedSubOrders };
        }
        return order;
      })
    );
    // Fire and forget API sync
    updateSubOrderStatusApi(orderId, vendorId, status).then((res) => {
      if (!res.success) {
        showToast('Sync Failed', 'Order status updated locally but failed to sync with backend.', 'warning');
      }
    });
    showToast('Fulfillment Updated', `Order status set to ${status}.`, 'success');
  };

  // ---------------------------------------------------------------------------
  // Vendors
  // ---------------------------------------------------------------------------

  const registerVendor = async (vendorData: Partial<Vendor> & { name: string; ownerName: string; ownerEmail: string }) => {
    const newVendor: Vendor = {
      id: `v-${Date.now()}`,
      name: vendorData.name,
      slug: vendorData.name.toLowerCase().replace(/[^a-z0-9]+/g, '-'),
      logo: vendorData.logo || 'https://images.unsplash.com/photo-1572021335469-31706a17aaef?w=300&q=80',
      coverImage: vendorData.coverImage || 'https://images.unsplash.com/photo-1526738549149-8e07eca6c147?w=1200&q=80',
      rating: 5.0,
      reviewsCount: 0,
      verified: false,
      tagline: vendorData.tagline || 'Artisanal specialty seller',
      description: vendorData.description || `${vendorData.name} is a newly applied vendor studio on MarketGrid awaiting KYC verification.`,
      joinedDate: 'Just Now',
      totalProducts: 0,
      totalOrders: 0,
      totalRevenue: '₹0',
      ownerName: vendorData.ownerName,
      ownerEmail: vendorData.ownerEmail,
      phone: vendorData.phone,
      businessType: vendorData.businessType || 'Sole Proprietorship',
      gstin: vendorData.gstin,
      panNumber: vendorData.panNumber,
      aadhaarNumber: vendorData.aadhaarNumber,
      addressStreet: vendorData.addressStreet,
      city: vendorData.city,
      state: vendorData.state,
      zipCode: vendorData.zipCode,
      bankAccountHolder: vendorData.bankAccountHolder,
      bankName: vendorData.bankName,
      accountNumber: vendorData.accountNumber,
      ifscCode: vendorData.ifscCode,
      status: 'PENDING',
    };
    setVendorsList((prev) => [newVendor, ...prev]);

    // Sync to backend
    const res = await registerVendorApi(vendorData);
    if (!res.success) {
      showToast('Sync Warning', res.message, 'warning');
    }

    showToast('Vendor Application Submitted', 'Review pending (2-3 business days). KYC credentials transmitted.', 'warning');
  };

  const approveVendor = async (vendorId: string) => {
    const target = vendorsList.find((v) => v.id === vendorId);
    setVendorsList((prev) =>
      prev.map((v) => (v.id === vendorId ? { ...v, status: 'ACTIVE', verified: true } : v))
    );
    if (target) {
      updateVendorStatusApi(vendorId, 'APPROVED').catch(console.warn);
      const res = await sendVendorStatusEmailApi({
        email: target.ownerEmail,
        vendorName: target.name,
        status: 'APPROVED',
      });
      showToast('Vendor Approved & Activated', res.message, 'success');
    }
  };

  const rejectVendor = async (vendorId: string) => {
    const target = vendorsList.find((v) => v.id === vendorId);
    setVendorsList((prev) =>
      prev.map((v) => (v.id === vendorId ? { ...v, status: 'REJECTED', verified: false } : v))
    );
    if (target) {
      updateVendorStatusApi(vendorId, 'REJECTED').catch(console.warn);
      const res = await sendVendorStatusEmailApi({
        email: target.ownerEmail,
        vendorName: target.name,
        status: 'REJECTED',
      });
      showToast('Vendor Application Rejected', res.message, 'warning');
    }
  };

  const suspendVendor = (vendorId: string) => {
    setVendorsList((prev) =>
      prev.map((v) => (v.id === vendorId ? { ...v, status: 'SUSPENDED' } : v))
    );
    updateVendorStatusApi(vendorId, 'SUSPENDED').catch(console.warn);
    showToast('Vendor Suspended', 'Vendor store has been temporarily disabled.', 'error');
  };

  const deleteVendor = (vendorId: string) => {
    setVendorsList((prev) => prev.filter((v) => v.id !== vendorId));
    setProductsList((prev) => prev.filter((p) => p.vendorId !== vendorId));
    showToast('Vendor Deleted', 'Vendor store and all listed products deleted.', 'error');
  };

  // ---------------------------------------------------------------------------
  // Products
  // ---------------------------------------------------------------------------

  const addProduct = (newProd: Omit<Product, 'id'>) => {
    const created: Product = { ...newProd, id: `p-${Date.now()}` };
    setProductsList((prev) => [created, ...prev]);
    showToast('Product Published', `${created.name} is now live on MarketGrid.`, 'success');
  };

  const toggleProductStatus = (productId: string) => {
    setProductsList((prev) =>
      prev.map((p) => {
        if (p.id === productId) {
          const newStatus = p.status === 'Active' ? 'Draft' : 'Active';
          return { ...p, status: newStatus as any };
        }
        return p;
      })
    );
    showToast('Status Updated', 'Product status changed.', 'info');
  };

  // ---------------------------------------------------------------------------
  // Provider
  // ---------------------------------------------------------------------------

  return (
    <AppContext.Provider
      value={{
        role,
        setRole,
        isAuthenticated,
        userEmail,
        authToken,
        pendingOtpUser,
        setPendingOtpUser,
        initiateOtpAuth,
        verifyOtpCode,
        resendOtpCode,
        login,
        logout,
        cart,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartByVendor,
        cartCount,
        cartSubtotal,
        cartDeliveryFee,
        cartGrandTotal,
        wishlist,
        toggleWishlist,
        isWishlisted,
        orders,
        updateSubOrderStatus,
        toasts,
        showToast,
        removeToast,
        isCartOpen,
        setIsCartOpen,
        vendorsList,
        registerVendor,
        approveVendor,
        rejectVendor,
        suspendVendor,
        deleteVendor,
        productsList,
        categoriesList,
        addProduct,
        toggleProductStatus,
        isLoadingData,
        hasError,
        errorMessage,
        retryLoadData,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};

export const useApp = () => {
  const context = useContext(AppContext);
  if (!context) throw new Error('useApp must be used within an AppProvider');
  return context;
};
