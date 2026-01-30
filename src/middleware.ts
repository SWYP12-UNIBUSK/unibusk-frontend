import type { NextRequest } from 'next/server';
import { NextResponse } from 'next/server';
import { ROUTES } from './constants';

export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;
  const accessToken = request.cookies.get('accessToken')?.value;
  const isAuthenticated = !!accessToken;

  // 1. 로그인 페이지(/login)에 접근했을 때의 처리
  if (pathname === ROUTES.LOGIN) {
    // 이미 인증된 상태라면 홈으로 보냄 (케이스 2)
    if (isAuthenticated) {
      return NextResponse.redirect(new URL(ROUTES.HOME, request.url));
    }
    // 미인증 상태라면 그대로 로그인 페이지를 보여줌 (NextResponse.next)
    return NextResponse.next();
  }

  // 2. 그 외 matcher에 걸린 보호된 페이지 접근 처리
  if (!isAuthenticated) {
    // 인증되지 않았다면 로그인 페이지로 보냄 (케이스 1)
    return NextResponse.redirect(new URL(ROUTES.LOGIN, request.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    '/profile/:path*',
    '/login',
  ],
};
