import StreamingApiExample from "../_components/StreamingApiExample";
import Link from "next/link";

// 캐싱을 비활성화하기 위한 설정
export const dynamic = "force-dynamic";
export const revalidate = 0;

export default function ApiStreamingPage() {
  return (
    <div className="max-w-6xl mx-auto p-6">
      <div className="mb-6">
        <Link href="/" className="text-blue-500 hover:underline">
          ← 기본 스트리밍 예제로 돌아가기
        </Link>
      </div>

      <h1 className="text-3xl font-bold mb-6">
        Next.js API 스트리밍 렌더링 예제
      </h1>

      <div className="mb-8">
        <p className="text-gray-700 mb-4">
          이 페이지는 Next.js의 서버 컴포넌트를 사용한 API 데이터 스트리밍을
          보여줍니다. 여러 독립적인 데이터 소스가 있을 때 각각의 데이터가
          준비되는 대로 UI를 점진적으로 표시합니다.
        </p>

        <p className="text-gray-700 bg-yellow-50 p-4 rounded-lg border border-yellow-200">
          <strong>참고:</strong> 이 예제에서는 실제 API 호출을 시뮬레이션하기
          위해 인위적인 지연을 사용합니다. 각 컴포넌트는 Suspense로 감싸져
          있으며, 데이터를 기다리는 동안 로딩 UI를 표시합니다.
        </p>
      </div>

      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        <StreamingApiExample />
      </div>

      <div className="bg-gray-50 p-6 rounded-lg">
        <h2 className="text-xl font-bold mb-4">스트리밍 렌더링의 장점</h2>
        <ul className="list-disc pl-5 space-y-2">
          <li>
            <strong>향상된 사용자 경험:</strong> 사용자는 전체 페이지를 기다릴
            필요 없이 컨텐츠를 즉시 볼 수 있습니다.
          </li>
          <li>
            <strong>점진적 로딩:</strong> 각 부분이 준비되면 화면에 표시되므로
            페이지가 점진적으로 구성됩니다.
          </li>
          <li>
            <strong>병렬 데이터 가져오기:</strong> 여러 데이터 소스에서 동시에
            데이터를 가져올 수 있으며, 각각이 독립적으로 렌더링됩니다.
          </li>
          <li>
            <strong>느린 API 격리:</strong> 하나의 느린 API가 전체 페이지를
            차단하지 않고 해당 부분만 지연됩니다.
          </li>
        </ul>
      </div>
    </div>
  );
}
