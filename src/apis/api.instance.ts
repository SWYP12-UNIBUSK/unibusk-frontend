import type { FetchConfig } from './api.types';
import { ENV } from '@/utils';

class APIClient {
  private baseURL: string;

  constructor(baseURL: string) {
    this.baseURL = baseURL;
  }

  private async request<T>(endpoint: string, config: FetchConfig = {}): Promise<T> {
    const { params, headers, body, ...restConfig } = config;
    let url = `${this.baseURL}${endpoint}`;

    if (params) {
      const searchParams = new URLSearchParams(params);
      url += `?${searchParams.toString()}`;
    }

    const needsJsonContentType = !(
      body instanceof FormData
      || body instanceof Blob
      || body instanceof URLSearchParams
    );

    const response = await fetch(url, {
      ...restConfig,
      body,
      headers: {
        ...(needsJsonContentType && { 'Content-Type': 'application/json' }),
        ...headers,
      },
      credentials: 'include',
    });

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `HTTP ${response.status}: ${errorText || response.statusText}`,
      );
    }

    return response.json();
  }

  async get<T>(endpoint: string, config?: FetchConfig): Promise<T> {
    return this.request<T>(endpoint, { ...config, method: 'GET' });
  }

  async post<T>(endpoint: string, data?: unknown, config?: FetchConfig): Promise<T> {
    const body
      = data instanceof FormData
        || data instanceof Blob
        || data instanceof URLSearchParams
        ? data
        : JSON.stringify(data);

    return this.request<T>(endpoint, {
      ...config,
      method: 'POST',
      body,
    });
  }

  async put<T>(endpoint: string, data?: unknown, config?: FetchConfig): Promise<T> {
    const body
      = data instanceof FormData
        || data instanceof Blob
        || data instanceof URLSearchParams
        ? data
        : JSON.stringify(data);

    return this.request<T>(endpoint, {
      ...config,
      method: 'PUT',
      body,
    });
  }

  async delete<T>(endpoint: string, config?: FetchConfig): Promise<T> {
    return this.request<T>(endpoint, { ...config, method: 'DELETE' });
  }
}

export const api = new APIClient(ENV.NEXT_PUBLIC_API_URL || '');
