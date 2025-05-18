import { Suspense } from "react";
import Link from "next/link";
import StrictRSCBoundary from "../_components/StrictRSCBoundary";
import RSCDebugger from "../_components/RSCDebugger";

// 순차적 지연 컴포넌트 생성
const delays = [1000, 2000, 3000, 4000, 5000];

// 시간별로 나오는 컴포넌트 생성 함수
function createDelayedComponents() {
  return delays.map((delay, index) => {
    const NestedComponent = async () => {
      await new Promise((resolve) => setTimeout(resolve, delay));
      const timestamp = new Date().toISOString();

      return (
        <div className={`p-3 my-2 rounded-lg bg-blue-${100 + index * 100}`}>
          <h3 className="font-medium text-blue-800">
            {delay / 1000}초 후 로드된 컴포넌트 #{index + 1}
          </h3>
          <p className="text-sm text-blue-700">타임스탬프: {timestamp}</p>
        </div>
      );
    };

    return <NestedComponent key={index} />;
  });
}

// 더 복잡한 내첩 컴포넌트
async function ComplexNestedComponent({
  depth = 0,
  maxDepth = 3,
  delay = 1000,
}: {
  depth?: number;
  maxDepth?: number;
  delay?: number;
}) {
  if (depth >= maxDepth) {
    await new Promise((resolve) => setTimeout(resolve, delay));
    return (
      <div className="p-3 rounded-lg bg-green-100 border border-green-200">
        <h4 className="font-medium text-green-800">최대 깊이 도달 ({depth})</h4>
        <p className="text-sm text-green-700">
          로드 시간: {new Date().toISOString().replace("T", " ").substr(0, 19)}
        </p>
      </div>
    );
  }

  await new Promise((resolve) => setTimeout(resolve, delay / 2));

  return (
    <div
      className={`p-3 rounded-lg bg-indigo-${
        100 + depth * 100
      } border border-indigo-${200 + depth * 100}`}
    >
      <h4 className="font-medium text-indigo-800">
        중첩 컴포넌트 깊이 {depth} (지연: {delay / 1000}초)
      </h4>
      <div className="mt-2 ml-4">
        <Suspense
          fallback={
            <div className="p-2 animate-pulse bg-gray-100 rounded">
              자식 로딩 중...
            </div>
          }
        >
          <ComplexNestedComponent
            depth={depth + 1}
            maxDepth={maxDepth}
            delay={delay * 0.7} // 중첩될수록 점점 빨라지게
          />
        </Suspense>
      </div>
    </div>
  );
}

export default function StrictRSCPage() {
  const delayedComponents = createDelayedComponents();

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <Link href="/" className="text-blue-500 hover:underline">
          ← 스트리밍 예제로 돌아가기
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-6">엄격한 RSC 스트리밍 경계 시연</h1>

      <RSCDebugger />

      <div className="bg-yellow-50 p-4 rounded-lg border border-yellow-100 mb-8">
        <h2 className="text-xl font-semibold mb-2">이 페이지의 특징</h2>
        <p className="mb-3">
          이 페이지는 여러 개의 명시적인 Suspense 경계를 중첩하여 Next.js의 RSC
          스트리밍이 최적화되지 않은 상태에서 어떻게 작동하는지 보여줍니다. 이를
          통해 RSC 페이로드가 네트워크에서 어떻게 전송되는지 더 명확하게 관찰할
          수 있습니다.
        </p>
        <ol className="list-decimal pl-5 space-y-1 text-sm">
          <li>네트워크 탭을 열고 이 페이지를 새로고침하세요.</li>
          <li>RSC 디버거에서 &apos;캡처 시작&apos; 버튼을 클릭하세요.</li>
          <li>
            각 컴포넌트가 준비되는 대로 페이지에 추가되는 과정을 확인하세요.
          </li>
          <li>
            스트리밍 청크가 네트워크 요청에서 어떻게 전송되는지 관찰하세요.
          </li>
        </ol>
      </div>

      <div className="space-y-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">
            순차적으로 로드되는 컴포넌트
          </h2>
          <p className="mb-4">
            각 컴포넌트는 서로 다른 지연 시간을 가지고 있으며, 준비되는 대로
            클라이언트에 스트리밍됩니다.
          </p>

          <StrictRSCBoundary name="순차적 컴포넌트" numBoundaries={10}>
            {delayedComponents}
          </StrictRSCBoundary>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">중첩된 비동기 컴포넌트</h2>
          <p className="mb-4">
            이 컴포넌트는 여러 수준으로 중첩되어 있으며, 각 수준마다 비동기
            작업을 수행합니다. 이는 RSC 스트리밍이 복잡한 컴포넌트 트리에서
            어떻게 작동하는지 보여줍니다.
          </p>

          <StrictRSCBoundary name="중첩 컴포넌트" numBoundaries={3}>
            <ComplexNestedComponent maxDepth={4} delay={2000} />
          </StrictRSCBoundary>
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg mt-8">
        <h2 className="text-lg font-semibold mb-2">기술적 설명</h2>
        <p className="text-sm">
          이 페이지는{" "}
          <code className="bg-gray-100 px-1 py-0.5 rounded">
            StrictRSCBoundary
          </code>
          컴포넌트를 사용하여 여러 개의 중첩된 Suspense 경계를 만듭니다. 이는
          실제 프로덕션에서는 권장되지 않는 방식이지만, RSC 페이로드가 어떻게
          스트리밍되는지 관찰하는 데 유용합니다. 이러한 접근 방식은 각 비동기
          컴포넌트가 별도의 청크로 클라이언트에 전송되도록 강제합니다.
        </p>
      </div>
    </div>
  );
}
