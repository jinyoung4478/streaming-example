"use client";

import { Suspense, ReactNode } from "react";

// 엄격한 RSC 스트리밍 경계를 만드는 컴포넌트
// 각 자식 컴포넌트마다 별도의 Suspense 경계를 만들어 스트리밍을 명확하게 확인할 수 있게 함
export default function StrictRSCBoundary({
  children,
  numBoundaries = 5,
  name = "RSC",
}: {
  children: ReactNode;
  numBoundaries?: number;
  name?: string;
}) {
  // 타임스탬프 생성
  const timestamp = new Date().toISOString().substring(11, 23);

  return (
    <div className="border border-gray-200 rounded-lg p-4 mb-4">
      <div className="bg-gray-50 p-2 rounded mb-3 text-xs font-mono">
        <strong>클라이언트 렌더링:</strong> {name} 경계 ({timestamp})
      </div>

      {/* 자식 컴포넌트에 여러 개의 Suspense 경계 적용 */}
      <SuspenseBoundaries depth={0} maxDepth={numBoundaries}>
        {children}
      </SuspenseBoundaries>
    </div>
  );
}

// 재귀적으로 Suspense 경계를 만드는 내부 컴포넌트
function SuspenseBoundaries({
  children,
  depth,
  maxDepth,
}: {
  children: ReactNode;
  depth: number;
  maxDepth: number;
}) {
  if (depth >= maxDepth) {
    return <>{children}</>;
  }

  return (
    <Suspense
      fallback={
        <div className="animate-pulse bg-gray-100 p-3 rounded-lg my-2">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded"></div>
        </div>
      }
    >
      <SuspenseBoundaries depth={depth + 1} maxDepth={maxDepth}>
        {children}
      </SuspenseBoundaries>
    </Suspense>
  );
}
