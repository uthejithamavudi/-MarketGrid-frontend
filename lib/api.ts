/**
 * MarketGrid — Central API Client
 *
 * Wraps all fetch calls to the Spring Boot API Gateway (localhost:8080).
 * Automatically attaches JWT Bearer token from localStorage.
 * Exports a helper to detect whether the backend is reachable.
 */

const BASE_URL = process.env.NEXT_PUBLIC_SPRING_BOOT_API_URL || 'http://localhost:8080';
const TOKEN_KEY = 'mg_jwt_token';

/** Retrieve stored JWT from localStorage (safe for SSR). */
export function getStoredToken(): string | null {
  if (typeof window === 'undefined') return null;
  return localStorage.getItem(TOKEN_KEY);
}

/** Persist JWT to localStorage. */
export function storeToken(token: string): void {
  if (typeof window !== 'undefined') localStorage.setItem(TOKEN_KEY, token);
}

/** Clear JWT from localStorage (logout). */
export function clearToken(): void {
  if (typeof window !== 'undefined') localStorage.removeItem(TOKEN_KEY);
}

interface FetchOptions extends RequestInit {
  skipAuth?: boolean;
}

/**
 * Core fetch wrapper.
 * - Prepends BASE_URL
 * - Injects Authorization header from stored JWT
 * - Throws on non-2xx responses (caller should catch)
 */
export async function apiFetch<T>(path: string, options: FetchOptions = {}): Promise<T> {
  const { skipAuth, ...fetchOptions } = options;

  const headers: Record<string, string> = {
    'Content-Type': 'application/json',
    ...(fetchOptions.headers as Record<string, string>),
  };

  if (!skipAuth) {
    const token = getStoredToken();
    if (token) {
      headers['Authorization'] = `Bearer ${token}`;
    }
  }

  const response = await fetch(`${BASE_URL}${path}`, {
    ...fetchOptions,
    headers,
  });

  if (!response.ok) {
    const errorBody = await response.json().catch(() => ({ message: response.statusText }));
    throw new Error(errorBody?.message || `API error ${response.status}`);
  }

  return response.json() as Promise<T>;
}

/**
 * Lightweight connectivity probe.
 * Returns true if the API Gateway responds within 2 seconds.
 */
export async function isBackendAlive(): Promise<boolean> {
  try {
    const controller = new AbortController();
    const timeout = setTimeout(() => controller.abort(), 2000);
    await fetch(`${BASE_URL}/actuator/health`, {
      method: 'GET',
      signal: controller.signal,
    });
    clearTimeout(timeout);
    return true;
  } catch {
    return false;
  }
}
