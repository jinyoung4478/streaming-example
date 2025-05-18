import { Suspense } from "react";

// 느린 데이터 로딩을 시뮬레이션하는 함수
// cache 래퍼 제거하여 매번 새로운 데이터 로드하도록 함
async function getData(delay = 3000) {
  // 캐싱 방지를 위한 임의의 값 추가
  const randomId = Math.random().toString(36).substring(7);
  console.log(`Loading data with randomId: ${randomId}`);

  await new Promise((resolve) => setTimeout(resolve, delay));
  return {
    message: "데이터가 로드되었습니다!",
    timestamp: new Date().toISOString(),
    id: randomId,
  };
}

// 비동기 컴포넌트 (자동으로 Suspense 경계 생성)
async function SlowData({ delay }: { delay?: number }) {
  const data = await getData(delay);

  return (
    <div className="p-4 bg-blue-50 rounded-lg">
      <h2 className="text-xl font-semibold text-blue-800">{data.message}</h2>
      <p className="text-sm text-gray-600">로드 시간: {data.timestamp}</p>
    </div>
  );
}

// Loading 컴포넌트
function LoadingComponent() {
  return (
    <div className="p-4 bg-gray-100 rounded-lg animate-pulse">
      데이터 로딩 중...
    </div>
  );
}

// 외부에서 사용할 래퍼 컴포넌트
export default function SlowComponent({ delay }: { delay?: number }) {
  return (
    <div className="my-4">
      <Suspense fallback={<LoadingComponent />}>
        <SlowData delay={delay} />
      </Suspense>
    </div>
  );
}
