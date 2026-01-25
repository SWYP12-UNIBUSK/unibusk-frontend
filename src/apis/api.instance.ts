import type { FetchConfig } from './api.types';
import { redirect } from 'next/navigation';
import { ENV } from '@/utils';

/**
 *  @see {@link https://github.com/SWYP12-UNIBUSK/unibusk-frontend/blob/main/docs/fetch-wrapper-guide.md} - fetch API wrapper guide
 */

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

    const hasValidBody = body !== undefined && body !== null && body !== '';
    const needsJsonContentType = hasValidBody
      && !(
        body instanceof FormData
        || body instanceof Blob
        || body instanceof URLSearchParams
      );

    const response = await fetch(url, {
      ...restConfig,
      ...(body !== undefined && { body }),
      headers: {
        ...(needsJsonContentType && { 'Content-Type': 'application/json' }),
        ...headers,
      },
      credentials: 'include',
    });

    if (response.status === 401) {
      // ✅ 서버/클라이언트 환경 분기
      if (typeof window === 'undefined') {
        // 서버: Next.js redirect 사용
        redirect('/login');
      }
      else {
        // 클라이언트: window.location 사용
        window.location.href = '/login';
      }
      throw new Error('Unauthorized');
    }

    if (!response.ok) {
      const errorText = await response.text();
      throw new Error(
        `HTTP ${response.status}: ${errorText || response.statusText}`,
      );
    }

    return response.json();
  }

  /**
   * GET 요청
   *
   * @example
   * // 기본 사용
   * const users = await api.get('/users');
   *
   * @example
   * // Query Parameters
   * const products = await api.get('/products', {
   *   params: { category: 'electronics', page: '1', sort: 'price' }
   * });
   *
   * @example
   * // 커스텀 헤더
   * const data = await api.get('/protected', {
   *   headers: { Authorization: 'Bearer token' }
   * });
   */
  async get<T>(endpoint: string, config?: FetchConfig): Promise<T> {
    return this.request<T>(endpoint, { ...config, method: 'GET' });
  }

  /**
   * POST 요청
   *
   * - JSON 데이터: 자동으로 Content-Type: application/json 설정
   * - FormData: 자동으로 multipart/form-data 설정 (boundary 포함)
   * - Blob: Blob의 type 속성을 Content-Type으로 사용
   * - URLSearchParams: 자동으로 application/x-www-form-urlencoded 설정
   *
   * @example
   * // JSON 전송
   * await api.post('/users', { name: 'John' });
   *
   * @example
   * // 파일 업로드
   * const formData = new FormData();
   * formData.append('file', file);
   * await api.post('/upload', formData);
   *
   * @example
   * // Blob 전송
   * const blob = new Blob(['content'], { type: 'application/pdf' });
   * await api.post('/documents', blob);
   *
   * @example
   * // URLSearchParams
   * const params = new URLSearchParams();
   * params.append('username', 'john');
   * await api.post('/login', params);
   */
  async post<T>(endpoint: string, data?: unknown, config?: FetchConfig): Promise<T> {
    if (data === undefined || data === null) {
      return this.request<T>(endpoint, {
        ...config,
        method: 'POST',
      });
    }

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

  /**
   * PUT 요청
   *
   * @example
   * await api.put('/users/123', { name: 'Updated Name' });
   */
  async put<T>(endpoint: string, data?: unknown, config?: FetchConfig): Promise<T> {
    if (data === undefined || data === null) {
      return this.request<T>(endpoint, {
        ...config,
        method: 'PUT',
      });
    }

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

  /**
   * DELETE 요청
   *
   * @example
   * await api.delete('/users/123');
   */
  async delete<T>(endpoint: string, config?: FetchConfig): Promise<T> {
    return this.request<T>(endpoint, { ...config, method: 'DELETE' });
  }
}

// todo: 다음 작업으로 server/client 데이터 패칭 api instance 분리 작업 예정
// todo: api instance 분리 작업을 진행하는 이유:
// todo: route handler에서 검증 중복 로직 제거 +  서버 컴포넌트에서 불필요한 route handler 호출 방지
function getApiUrl() {
  return ENV.NEXT_PUBLIC_APP_URL || 'http://localhost:3000';
}

export const api = new APIClient(getApiUrl());
