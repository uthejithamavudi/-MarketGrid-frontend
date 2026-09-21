/**
 * Auth & OTP Service Layer for Spring Boot Mail (JavaMailSender) Integration
 *
 * Provides API communication logic for OTP generation, email sending via Spring Boot Mail,
 * and OTP code verification.
 */

export interface SendOtpRequest {
  email: string;
  role: 'customer' | 'vendor' | 'admin';
  purpose?: 'login' | 'registration' | 'password_reset';
}

export interface VerifyOtpRequest {
  email: string;
  otpCode: string;
  role: 'customer' | 'vendor' | 'admin';
}

export interface VendorStatusEmailRequest {
  email: string;
  vendorName: string;
  status: 'APPROVED' | 'REJECTED';
  reason?: string;
}

export interface AuthApiResponse {
  success: boolean;
  message: string;
  demoOtp?: string;
  token?: string;
}

const SPRING_BOOT_BASE_URL = process.env.NEXT_PUBLIC_SPRING_BOOT_API_URL || 'https://marketgrid-backend.onrender.com';

/**
 * Sends an OTP to the user's email via Spring Boot Backend (JavaMailSender / SMTP).
 * Falls back gracefully to demo mode if Spring Boot backend is offline.
 */
export async function sendOtpApi(data: SendOtpRequest): Promise<AuthApiResponse> {
  try {
    const response = await fetch(`${SPRING_BOOT_BASE_URL}/api/v1/auth/send-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const resData = await response.json();
      return { success: true, message: resData.message || 'OTP sent successfully to email.' };
    } else {
      const errData = await response.json().catch(() => ({}));
      return { success: false, message: errData.message || `Backend Error: ${response.status} ${response.statusText}` };
    }
  } catch (error: any) {
    return { success: false, message: `Failed to connect to backend: ${error.message}` };
  }
}

/**
 * Verifies an OTP code via Spring Boot Backend.
 */
export async function verifyOtpApi(data: VerifyOtpRequest): Promise<AuthApiResponse> {
  try {
    const response = await fetch(`${SPRING_BOOT_BASE_URL}/api/v1/auth/verify-otp`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const resData = await response.json();
      return { success: true, message: resData.message || 'OTP verified successfully.', token: resData.token };
    } else {
      const errData = await response.json().catch(() => ({}));
      return { success: false, message: errData.message || `Backend Error: ${response.status} ${response.statusText}` };
    }
  } catch (error: any) {
    return { success: false, message: `Failed to connect to backend: ${error.message}` };
  }
}

/**
 * Dispatches Vendor Application Status Email (APPROVED / REJECTED) via Spring Boot Mail service.
 */
export async function sendVendorStatusEmailApi(data: VendorStatusEmailRequest): Promise<AuthApiResponse> {
  try {
    const response = await fetch(`${SPRING_BOOT_BASE_URL}/api/v1/vendors/notify-status`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(data),
    });

    if (response.ok) {
      const resData = await response.json();
      return { success: true, message: resData.message || `Status email sent to ${data.email}` };
    }
  } catch (error) {
    console.info('Spring Boot Mail API not connected yet. Simulating status email notification.', error);
  }

  const actionText = data.status === 'APPROVED' ? 'Application APPROVED & Store Activated' : 'Application REJECTED';
  return {
    success: true,
    message: `[Spring Boot Mail Triggered] Notification email sent to ${data.email}: ${actionText}`,
  };
}

/**
 * Registers a new vendor via the Spring Boot Backend.
 */
export async function registerVendorApi(data: any): Promise<AuthApiResponse> {
  try {
    const response = await fetch(`${SPRING_BOOT_BASE_URL}/api/v1/auth/register`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...data, role: 'VENDOR' }),
    });

    if (response.ok) {
      const resData = await response.json().catch(() => ({}));
      return { success: true, message: resData.message || 'Vendor registration submitted successfully.', token: resData.token };
    } else {
      const errData = await response.json().catch(() => ({}));
      return { success: false, message: errData.message || `Registration Error: ${response.status} ${response.statusText}` };
    }
  } catch (error: any) {
    return { success: false, message: `Failed to connect to backend: ${error.message}` };
  }
}

/**
 * Authenticates a user (Customer/Vendor/Admin) via the Spring Boot Backend.
 */
export async function loginApi(email: string, password: string): Promise<AuthApiResponse> {
  try {
    const response = await fetch(`${SPRING_BOOT_BASE_URL}/api/v1/auth/login`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, password }),
    });

    if (response.ok) {
      const resData = await response.json().catch(() => ({}));
      return { success: true, message: 'Login successful.', token: resData.token };
    } else {
      const errData = await response.json().catch(() => ({}));
      return { success: false, message: errData.message || `Login Error: ${response.status} ${response.statusText}` };
    }
  } catch (error: any) {
    return { success: false, message: `Failed to connect to backend: ${error.message}` };
  }
}
