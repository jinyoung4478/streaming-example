# Next.js 스트리밍 렌더링 예제

이 프로젝트는 Next.js의 스트리밍 렌더링 기능을 시연합니다. 스트리밍 렌더링을 통해 서버 컴포넌트를 클라이언트에 점진적으로 스트리밍하여 사용자 경험을 향상시킬 수 있습니다.

## 주요 기능

- **기본 스트리밍 예제**: 다양한 지연 시간을 가진 컴포넌트의 점진적 로딩
- **API 스트리밍 예제**: 다중 API 호출 결과를 독립적으로 스트리밍하는 방법
- **Suspense와 로딩 상태**: 데이터 로딩 중 표시할 스켈레톤 UI

## 실행 방법

```bash
# 패키지 설치
yarn install

# 개발 서버 실행
yarn dev
```

브라우저에서 [http://localhost:3000](http://localhost:3000)으로 접속하여 예제를 확인할 수 있습니다.

## 예제 구성

1. **메인 페이지**: 프로젝트 소개 및 스트리밍 예제 링크
2. **기본 스트리밍 예제**: `/streaming` 경로에서 접근 가능한 기본 스트리밍 데모
3. **API 스트리밍 예제**: `/streaming/api-example` 경로에서 접근 가능한 고급 스트리밍 데모

## 핵심 기술

- Next.js App Router
- React Server Components
- Suspense
- Tailwind CSS

## 스트리밍 렌더링의 이점

- 전체 페이지가 준비될 때까지 기다릴 필요 없이 빠르게 UI 표시 가능
- 느린 데이터 요청이 페이지의 다른 부분을 차단하지 않음
- 서버와 클라이언트 간의 병렬 처리 향상
- 사용자 체감 성능 개선

## 학습 자료

- [Next.js 공식 문서](https://nextjs.org/docs)
- [스트리밍에 대한 Next.js 문서](https://nextjs.org/docs/app/building-your-application/routing/loading-ui-and-streaming)
