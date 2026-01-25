import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';

// ! route path가 확정되면, constants/routes.ts의 routePath 함수로 교체 예정
const PROTECTED_ROUTES = ['/profile'];
const AUTH_ROUTES = ['/login', '/signup'];

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get('accessToken')?.value;

  const isAuthenticated = !!accessToken;
  const isProtectedRoute = PROTECTED_ROUTES.some(route =>
    pathname.startsWith(route),
  );
  const isAuthRoute = AUTH_ROUTES.some(route => pathname.startsWith(route));

  // 케이스 1: 미인증 + 보호된 페이지
  if (!isAuthenticated && isProtectedRoute) {
    const url = request.nextUrl.clone();

    url.pathname = '/login';

    return NextResponse.redirect(url);
  }

  // 케이스 2: 인증됨 + 로그인 페이지
  if (isAuthenticated && isAuthRoute) {
    const url = request.nextUrl.clone();

    url.pathname = '/';

    return NextResponse.redirect(url);
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/profile/:path*',
    '/login',
    '/signup',
  ],
};
