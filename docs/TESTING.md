# Testing Guide

이 프로젝트는 **Vitest**와 **MSW (Mock Service Worker)**를 사용하여 단위 테스트 및 통합 테스트 환경을 구축했습니다.

## 🛠 Tech Stack for Testing
- **Test Runner**: [Vitest](https://vitest.dev/) (Vite 기반의 고속 테스트 러너)
- **Mocking**: [MSW](https://mswjs.io/) (네트워크 요청 가로채기)
- **Assertions**: [Testing Library](https://testing-library.com/) & Jest-DOM

## 🚀 Running Tests

### 전체 테스트 실행
```bash
pnpm test run
```

### 와치 모드 (파일 변경 감지)
개발 중에는 아래 명령어로 테스트를 계속 실행시켜둘 수 있습니다.
```bash
pnpm test
```

## 🎭 MSW (API Mocking)

API 서버가 없어도 테스트가 가능하도록 네트워크 요청을 가로챕니다.

- **Handlers 위치**: `src/mocks/handlers.ts`
- **Browser (Dev)**: `src/mocks/browser.ts` (개발 중 브라우저에서 동작)
- **Node (Test)**: `src/mocks/server.ts` (Vitest 환경에서 동작)

### 핸들러 추가 방법
`handlers.ts`에 원하는 API 응답을 정의합니다.

```typescript
import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get('https://api.example.com/data', () => {
    return HttpResponse.json({ message: 'Mocked Data' });
  }),
];
```

## 🧪 Writing Tests Example

Repository 테스트 작성 시, `server`를 import해서 특정 테스트 케이스를 위한 오버라이딩을 할 수 있습니다.

```typescript
import { server } from '../../mocks/server';
import { http, HttpResponse } from 'msw';

it('핸들링 에러 테스트', async () => {
  // 이번 테스트에서만 500 에러를 리턴하도록 설정
  server.use(
    http.get('...', () => {
        return new HttpResponse(null, { status: 500 });
    })
  );
  
  await expect(myFunction()).rejects.toThrow();
});
```
