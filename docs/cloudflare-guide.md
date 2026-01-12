# Cloudflare Workers 배포 환경 가이드

## Cloudflare Workers를 선택한 이유

프로젝트 초기에 Vercel과 Cloudflare Workers 중 어떤 배포 환경을 사용할지 논의했고, 최종적으로 Cloudflare Workers를 선택했습니다.

**주요 선택 이유**:

- Vercel Hobby 플랜은 Organization Repository를 직접 연결할 수 없음
- Cloudflare는 무료 플랜에서도 충분한 성능과 기능 제공
- 유연한 배포 설정과 권한 관리 가능

이 문서는 Vercel에 익숙한 팀원들을 위해 Cloudflare Workers의 특성과 주의사항을 정리한 것입니다.

---

## 프로젝트 환경

- **@opennextjs/cloudflare**: v1.14.8
- **wrangler**: v4.58.0
- **Next.js**: 15.x (16은 아직 미지원)
- **Runtime**: Node.js Runtime (Edge Runtime 아님)

Node.js Runtime을 사용하므로 서버에서 `fs`, `path`, `crypto` 같은 Node 내장 모듈을 사용할 수 있습니다.

---

## Vercel과 주요 차이점

### 1. 개발 워크플로우와 환경 변수 설정

### `pnpm run dev` (next dev) - 일반적인 Next.js 개발

**Vercel 방식과 동일**:

- **런타임**: Node.js
- **목적**: 빠른 핫 리로딩과 개발 편의성
- **동작**: 컴파일 최적화 없이 소스 코드 변경 시 즉시 반영
- **환경 변수**: `.env.*` 파일 사용
- **권장 용도**: 일상적인 코드 작성 및 디버깅

이 모드에서는 Vercel과 똑같이 개발할 수 있습니다. Cloudflare 특화 기능을 사용하지 않는다면 이 방식으로 충분합니다.

### `pnpm run preview` (wrangler dev) - Cloudflare Workers 환경 테스트

**Cloudflare 환경에서 실행**:

- **런타임**: Cloudflare Workers (workerd)
- **목적**: 프로덕션 환경과 동일한 조건에서 테스트
- **동작**: 실제 빌드 결과물을 Workers 런타임에서 실행
- **환경 변수**: `.dev.vars` 파일 사용 ⚠️
- **권장 용도**: 통합 테스트 및 배포 전 최종 검증

**왜 `.dev.vars`가 필요한가?**

Cloudflare Workers는 일반 Node.js와 다른 런타임 환경입니다. `wrangler dev`로 실행할 때는 `.env.*`이 아닌 `.dev.vars` 파일을 읽습니다. 이는 Wrangler CLI의 스펙이므로 반드시 따라야 합니다.

**실제 개발 워크플로우**:

```bash
# 1. 일상적인 개발: pnpm run dev 사용
# .env.* 파일로 환경 변수 관리

# 2. 기능 완성 후: pnpm run preview로 Workers 환경 테스트
# .dev.vars 파일 필요 (없으면 환경 변수 에러 발생)

# 3. 배포 전: preview에서 문제 없는지 확인
pnpm run preview

# OpenNext Cloudflare 공식 문서 권장 워크플로우:
# ✅ 일상적인 개발: pnpm run dev 사용 (빠른 피드백)
# ✅ 기능 완성 후: pnpm run preview로 Workers 환경 테스트
# ✅ 배포 전: 최종적으로 preview에서 문제 없는지 확인
```

**환경 변수 파일 준비**:

```bash
# .env.local (next dev용)
DATABASE_URL=postgresql://localhost:5432/mydb
API_KEY=your-dev-api-key

# .dev.vars (wrangler dev용) - 동일한 내용을 복사
DATABASE_URL=postgresql://localhost:5432/mydb
API_KEY=your-dev-api-key
```

**프로덕션 환경 변수**:

```bash
# Cloudflare Dashboard 또는 wrangler secret 명령어 사용
wrangler secret put API_KEY
```

**주의**:

- `.env.*`과 `.dev.vars` 두 파일 모두 필요합니다
- 두 파일 모두 Git에 커밋하지 않습니다
- 팀원은 `.env.*.example`, `.dev.vars.example`을 참고해서 각자 생성
- 환경 변수 추가 시 두 파일 모두 업데이트 필요

### 2. Next.js Middleware 제약사항 ⚠️

Vercel에서는 `middleware.ts` 파일로 인증, 리다이렉션 등을 처리하는 것이 일반적입니다. 하지만 Cloudflare Workers 환경에서는 Next.js Middleware가 제한적으로 작동하거나 완전히 작동하지 않을 수 있습니다.

특히 Cloudflare Images나 R2 Bucket 같은 Cloudflare 서비스를 Workers에 바인딩하면 Middleware가 작동하지 않는 것을 확인했습니다.

**대신 사용하는 패턴: Server Component에서 인증 체크**

```tsx
// utils/auth.ts - 재사용 가능한 인증 유틸리티
import { cookies } from 'next/headers';
import { redirect } from 'next/navigation';

export async function requireAuth() {
  const cookieStore = await cookies();
  const token = cookieStore.get('auth-token')?.value;

  if (!token) {
    redirect('/login');
  }

  const user = await verifyToken(token);
  if (!user) {
    redirect('/login');
  }

  return user;
}
```

**개별 페이지에서 사용**:

```tsx
// app/dashboard/page.tsx
import { requireAuth } from '@/utils/auth';

export default async function DashboardPage() {
  const user = await requireAuth(); // 인증되지 않으면 자동으로 /login으로 리다이렉트

  return (
    <div>
      환영합니다,
      {user.name}
      님
    </div>
  );
}
```

**Layout으로 여러 페이지 한 번에 보호**:

```tsx
// app/(protected)/layout.tsx
import { requireAuth } from '@/utils/auth';

export default async function ProtectedLayout({ children }) {
  await requireAuth(); // 이 Layout 아래 모든 페이지 보호
  return <>{children}</>;
}
```

이 방식은 Middleware보다 더 명시적이고 유연합니다. 각 페이지나 Layout에서 필요한 권한 수준을 명확히 선언할 수 있습니다.

### 3. 배포 프로세스

**Vercel**:

```bash
git push → 자동으로 Vercel에서 빌드 및 배포
```

**Cloudflare Workers**:

```bash
# 로컬 개발
pnpm run dev

# 프로덕션 배포
pnpm run opennextjs-cloudflare build && opennextjs-cloudflare deploy
```

GitHub Actions를 통한 자동 배포 설정도 가능하지만, Cloudflare API Token을 별도로 설정해야 합니다. UNIBUSK FE 프로젝트에는 CI/CD 파이프라인 설계를 완료한 상태입니다.

### 4. 이미지 최적화

**Vercel**: 자동으로 이미지 최적화 제공 (추가 설정 불필요)

**Cloudflare Workers**: Cloudflare Images 서비스 사용 (별도 설정 필요)

`next/image` 컴포넌트는 동일하게 사용할 수 있지만, Cloudflare Images binding 설정 필요

```json
// wrangler.json

{
  "images": {
    "binding": "IMAGES"
  }
}
```

---

## 개발할 때 주의사항

### ⚠️ Next.js 버전 제약

**중요**: Next.js 16으로 업그레이드하지 마세요. @opennextjs/cloudflare v1.14.8은 아직 Next.js 16을 지원하지 않습니다.

Next.js를 업그레이드하고 싶다면 먼저 @opennextjs/cloudflare의 [공식 GitHub](https://github.com/opennextjs/opennextjs-cloudflare)에서 최신 버전이 Next.js 16을 지원하는지 확인한 후, 패키지 버전을 함께 업데이트해야 합니다.

### Node.js 내장 모듈 사용 가능

Cloudflare Workers는 일반적으로 제한된 런타임 환경을 제공하지만, 우리가 사용하는 @opennextjs/cloudflare v1.14.8은 Node.js Runtime을 사용합니다.

**사용 가능한 Node 모듈 예시**:

```tsx
import crypto from 'node:crypto';
// Server Component나 API Route에서 사용 가능
import fs from 'node:fs';
import path from 'node:path';

// 예: 서버에서 파일 읽기
export async function GET() {
  const filePath = path.join(process.cwd(), 'data', 'config.json');
  const data = fs.readFileSync(filePath, 'utf-8');
  return Response.json(JSON.parse(data));
}
```

단, 일부 Node API는 polyfill을 통해 제공되므로, 새로운 Node 내장 모듈을 사용할 때는 반드시 로컬과 프로덕션 환경에서 모두 테스트해야 합니다.

### Middleware 대신 Server Component 패턴 사용

앞서 설명한 것처럼 Middleware가 작동하지 않으므로, 다음과 같은 로직은 모두 Server Component나 API Route에서 처리해야 합니다:

- 인증 체크 (authentication)
- 권한 확인 (authorization)
- 리다이렉션 로직
- 요청 헤더 수정
- 국제화(i18n) 처리

### 환경 변수 관리

`.dev.vars` 파일은 Git에 커밋되지 않으므로:

- 팀원은 `.dev.vars.example`을 복사해서 자신의 `.dev.vars` 파일을 만들어야 함
- 환경 변수가 추가/변경되면 팀 채널에 공유 필요
- 프로덕션 환경 변수는 팀장이 Cloudflare Dashboard에서 관리

---

## 빠른 시작 가이드

### 처음 프로젝트를 클론했을 때

```bash
# 1. 의존성 설치
npm install

# 2. .dev.vars 파일 생성
cp .dev.vars.example .dev.vars
# 파일을 열어서 실제 환경 변수 값 입력

# 3. 로컬 개발 서버 실행
npm run dev
```

### 인증이 필요한 새 페이지 만들 때

```tsx
// app/my-page/page.tsx
import { requireAuth } from '@/lib/auth';

export default async function MyPage() {
  const user = await requireAuth(); // 이 한 줄로 인증 체크 완료

  return (
    <div>
      <h1>나의 페이지</h1>
      <p>
        로그인된 사용자:
        {user.name}
      </p>
    </div>
  );
}
```

### 자주 발생하는 문제 해결

**"환경 변수를 찾을 수 없습니다" 에러**:

- `.dev.vars` 파일이 존재하는지 확인
- 파일 내용이 올바른 형식인지 확인 (`KEY=value` 형식)

**"Middleware가 실행되지 않습니다" 에러**:

- Cloudflare Workers는 Next.js Middleware를 지원하지 않음
- Server Component에서 `requireAuth()` 같은 함수 사용

**빌드 에러 발생**:

- Next.js 버전이 15.x인지 확인
- `package.json`에서 Next.js 16 관련 패키지가 없는지 확인
