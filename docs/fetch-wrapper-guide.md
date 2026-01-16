# Fetch API Wrapper 사용 가이드

## 기본 사용법

### GET 요청

```typescript
import { api } from '@/apis/api.instance';

// 기본 GET
const users = await api.get('/users');

// Query Parameters
const products = await api.get('/products', {
  params: {
    category: 'electronics',
    page: '1',
    limit: '10'
  }
});
```

### POST 요청

#### JSON 데이터 전송

```typescript
const newUser = await api.post('/users', {
  name: 'John Doe',
  email: 'john@example.com',
  age: 30
});
// → Content-Type: application/json (자동)
```

#### 파일 업로드 (FormData)

```typescript
const formData = new FormData();
formData.append('file', fileBlob);
formData.append('title', 'My Document');

const result = await api.post('/upload', formData);
// → Content-Type: multipart/form-data; boundary=... (자동)
```

#### Blob 전송

```typescript
const blob = new Blob(['content'], { type: 'application/pdf' });
const result = await api.post('/documents', blob);
// → Content-Type: application/pdf (자동)
```

#### 폼 데이터 (URLSearchParams)

```typescript
const params = new URLSearchParams();
params.append('username', 'johndoe');
params.append('password', 'secret');

const result = await api.post('/login', params);
// → Content-Type: application/x-www-form-urlencoded (자동)
```

### PUT 요청

```typescript
await api.put('/users/123', {
  name: 'Updated Name',
  email: 'newemail@example.com'
});
```

### DELETE 요청

```typescript
await api.delete('/users/123');
```

### 커스텀 헤더

```typescript
const data = await api.get('/protected', {
  headers: {
    'Authorization': 'Bearer your-token',
    'X-Custom-Header': 'value'
  }
});
```

## Content-Type 자동 처리

Fetch API Wrapper는 전달된 데이터 타입에 따라 자동으로 Content-Type을 설정합니다:

| 데이터 타입     | Content-Type                        | 설명                                 |
| --------------- | ----------------------------------- | ------------------------------------ |
| 일반 객체       | `application/json`                  | 자동으로 JSON.stringify 처리         |
| FormData        | `multipart/form-data`               | 브라우저가 boundary와 함께 자동 설정 |
| Blob            | Blob의 type 속성                    | 예: `application/pdf`                |
| URLSearchParams | `application/x-www-form-urlencoded` | 폼 데이터 형식                       |
