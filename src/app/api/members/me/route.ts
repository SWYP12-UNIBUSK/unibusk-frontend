import { cookies } from 'next/headers';
import { NextResponse } from 'next/server';
import { ENV } from '@/utils';

// todo: 다음 작업에서 중복되는 api 워크플로우를 제거하기 위해서
// todo: api instance를 server, client로 분리 작업 예정
export async function GET() {
  try {
    const cookieStore = await cookies();

    const response = await fetch(`${ENV.API_URL}/api/members/me`, {
      method: 'GET',
      headers: {
        Cookie: cookieStore.toString(),
      },
      cache: 'no-store',
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error('❌ Backend error:', errorText, ' - api/members/me/route.ts');

      return NextResponse.json(
        { error: errorText || 'Failed to fetch user info' },
        { status: response.status },
      );
    }

    const data = await response.json();

    return NextResponse.json(data, { status: 200 });
  }
  catch (error) {
    console.error('❌ Error in Route Handler:', error);

    return NextResponse.json(
      { error: error instanceof Error ? error.message : 'Internal server error' },
      { status: 500 },
    );
  }
}
