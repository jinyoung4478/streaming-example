import { Suspense } from "react";
import Link from "next/link";
import RSCDebugger from "../_components/RSCDebugger";

// 명시적으로 느린 로딩 컴포넌트 (10초 지연)
async function VerySlowComponent() {
  console.log("서버에서 VerySlowComponent 실행 시작");
  await new Promise((resolve) => setTimeout(resolve, 10000));
  console.log("서버에서 VerySlowComponent 실행 완료");

  return (
    <div className="bg-green-100 p-4 rounded-lg">
      <h3 className="font-bold text-green-800">10초 후 로드된 컴포넌트</h3>
      <p>
        이 컴포넌트는 10초의 지연 후 표시됩니다. 네트워크 탭에서 RSC 페이로드를
        확인해보세요.
      </p>
      <p>로드 시간: {new Date().toISOString()}</p>
    </div>
  );
}

// 중간 속도 컴포넌트 (5초 지연)
async function MediumSlowComponent() {
  console.log("서버에서 MediumSlowComponent 실행 시작");
  await new Promise((resolve) => setTimeout(resolve, 5000));
  console.log("서버에서 MediumSlowComponent 실행 완료");

  return (
    <div className="bg-yellow-100 p-4 rounded-lg">
      <h3 className="font-bold text-yellow-800">5초 후 로드된 컴포넌트</h3>
      <p>
        이 컴포넌트는 5초의 지연 후 표시됩니다. 네트워크 탭에서 RSC 페이로드를
        확인해보세요.
      </p>
      <p>로드 시간: {new Date().toISOString()}</p>
    </div>
  );
}

// 빠른 컴포넌트 (1초 지연)
async function FastComponent() {
  console.log("서버에서 FastComponent 실행 시작");
  await new Promise((resolve) => setTimeout(resolve, 1000));
  console.log("서버에서 FastComponent 실행 완료");

  return (
    <div className="bg-blue-100 p-4 rounded-lg">
      <h3 className="font-bold text-blue-800">1초 후 로드된 컴포넌트</h3>
      <p>
        이 컴포넌트는 1초의 지연 후 표시됩니다. 네트워크 탭에서 RSC 페이로드를
        확인해보세요.
      </p>
      <p>로드 시간: {new Date().toISOString()}</p>
    </div>
  );
}

export default function RSCDebugPage() {
  console.log("서버에서 RSCDebugPage 렌더링 시작");

  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="mb-6">
        <Link href="/" className="text-blue-500 hover:underline">
          ← 스트리밍 예제로 돌아가기
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-6">RSC 페이로드 디버깅 페이지</h1>

      <RSCDebugger />

      <div className="mb-8 bg-gray-100 p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">RSC 페이로드 확인 방법</h2>
        <ol className="list-decimal pl-5 space-y-2">
          <li>브라우저의 개발자 도구 열기 (F12 또는 Cmd+Option+I)</li>
          <li>네트워크 탭 선택</li>
          <li>{`필터를 'All' 또는 'Fetch/XHR'로 설정`}</li>
          <li>페이지 새로고침</li>
          <li>{`요청 중 'rsc' 또는 'flight'가 포함된 요청 찾기`}</li>
          <li>
            요청의 응답 내용을 살펴보면 스트리밍 청크와 RSC 페이로드를 확인할 수
            있습니다
          </li>
        </ol>
      </div>

      <div className="space-y-8">
        <div>
          <h2 className="text-xl font-semibold mb-4">즉시 표시되는 콘텐츠</h2>
          <div className="bg-green-50 p-4 rounded-lg">
            <p>
              이 콘텐츠는 즉시 표시됩니다. 아래 컴포넌트들은 지연 후 점진적으로
              로드됩니다.
            </p>
          </div>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">1초 지연 컴포넌트</h2>
          <Suspense
            fallback={
              <div className="p-4 bg-gray-100 rounded-lg animate-pulse">
                1초 컴포넌트 로딩 중...
              </div>
            }
          >
            <FastComponent />
          </Suspense>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">5초 지연 컴포넌트</h2>
          <Suspense
            fallback={
              <div className="p-4 bg-gray-100 rounded-lg animate-pulse">
                5초 컴포넌트 로딩 중...
              </div>
            }
          >
            <MediumSlowComponent />
          </Suspense>
        </div>

        <div>
          <h2 className="text-xl font-semibold mb-4">10초 지연 컴포넌트</h2>
          <Suspense
            fallback={
              <div className="p-4 bg-gray-100 rounded-lg animate-pulse">
                10초 컴포넌트 로딩 중...
              </div>
            }
          >
            <VerySlowComponent />
          </Suspense>
        </div>
      </div>

      <div className="mt-8 bg-gray-50 p-4 rounded-lg">
        <h2 className="text-xl font-semibold mb-4">RSC와 스트리밍 디버깅 팁</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>프리페치 비활성화:</strong>{" "}
            {`브라우저 개발자 도구에서
            "네트워크 제한" 옵션을 사용하여 프리페치를 비활성화하면 RSC
            페이로드를 더 명확하게 볼 수 있습니다.`}
          </li>
          <li>
            <strong>서버 로그 확인:</strong> 터미널에서 개발 서버 로그를
            확인하여 RSC 렌더링 과정을 추적할 수 있습니다.
          </li>
          <li>
            <strong>크롬 개발자 도구 설정:</strong>{" "}
            {`네트워크 탭에서 "Large
            request rows"를 활성화하면 더 많은 정보를 볼 수 있습니다.`}
          </li>
        </ul>
      </div>
    </div>
  );
}
