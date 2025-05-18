import SlowComponent from "./_components/SlowComponent";
import Link from "next/link";

export default function StreamingPage() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <h1 className="text-3xl font-bold mb-6">Next.js 스트리밍 렌더링 예제</h1>

      <div className="mb-4 bg-blue-50 p-4 rounded-lg border border-blue-100">
        <div className="mb-3 font-medium text-blue-800">예제 페이지:</div>
        <Link
          href="/api-example"
          className="text-blue-600 hover:underline block mb-2"
        >
          1. API 데이터 스트리밍 고급 예제 →
        </Link>
        <Link
          href="/rsc-debug"
          className="text-blue-600 hover:underline block mb-2"
        >
          2. RSC 페이로드 디버깅 페이지 →
        </Link>
        <Link
          href="/strict-rsc"
          className="text-blue-600 hover:underline block"
        >
          3. 엄격한 RSC 스트리밍 경계 시연 →
        </Link>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">즉시 렌더링되는 콘텐츠</h2>
        <p className="mb-4">
          이 콘텐츠는 즉시 사용자에게 표시됩니다. 스트리밍 렌더링은 페이지의
          일부가 지연되더라도 나머지 UI를 즉시 표시할 수 있게 해줍니다.
        </p>
        <div className="bg-green-50 p-4 rounded-lg">
          <p className="text-green-800">이 부분은 즉시 로드됩니다!</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">
            3초 후 로드되는 컴포넌트
          </h2>
          <SlowComponent delay={3000} />
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">
            5초 후 로드되는 컴포넌트
          </h2>
          <SlowComponent delay={5000} />
        </div>
      </div>

      <div className="mb-8">
        <h2 className="text-xl font-semibold mb-4">
          서로 다른 지연 시간의 컴포넌트들
        </h2>
        <div className="space-y-4">
          {[1, 2, 3, 4, 5].map((seconds) => (
            <div key={seconds} className="border p-4 rounded-lg">
              <h3 className="font-medium mb-2">{seconds}초 지연 컴포넌트</h3>
              <SlowComponent delay={seconds * 1000} />
            </div>
          ))}
        </div>
      </div>

      <div className="bg-gray-50 p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-2">스트리밍 렌더링이란?</h2>
        <p>
          Next.js의 스트리밍 렌더링은 서버 컴포넌트를 작은 청크로 나누어 사용
          가능해지는 대로 클라이언트에 점진적으로 전송합니다. 이를 통해 전체
          페이지가 서버에서 완전히 렌더링될 때까지 기다릴 필요 없이 페이지의
          일부를 먼저 표시할 수 있습니다.
        </p>
      </div>
    </div>
  );
}
