"use client";

import { useState, useEffect } from "react";

// PerformanceEntry 타입을 위한 인터페이스 정의
interface RSCPerformanceEntry extends PerformanceResourceTiming {
  name: string;
  initiatorType: string;
  duration: number;
  transferSize: number;
}

// RSC 페이로드 관련 요청을 추적하는 클라이언트 컴포넌트
export default function RSCDebugger() {
  const [requests, setRequests] = useState<RSCPerformanceEntry[]>([]);
  const [isCapturing, setIsCapturing] = useState(false);
  const [showHelp, setShowHelp] = useState(true);

  // 네트워크 요청을 캡처하는 기능
  useEffect(() => {
    if (!isCapturing) return;

    // 기존 performance entries 삭제
    performance.clearResourceTimings();

    // 성능 관찰자 설정
    const observer = new PerformanceObserver((list) => {
      const entries = list.getEntries() as RSCPerformanceEntry[];

      // RSC 관련 요청 필터링
      const rscEntries = entries.filter((entry) => {
        const url = entry.name;
        // RSC 또는 Next.js 관련 요청 필터링
        return (
          url.includes("_next/") ||
          url.includes("rsc") ||
          url.includes("flight")
        );
      });

      if (rscEntries.length > 0) {
        setRequests((prev) => [...prev, ...rscEntries]);
      }
    });

    // 리소스 타이밍 관찰 시작
    observer.observe({ entryTypes: ["resource"] });

    return () => {
      observer.disconnect();
    };
  }, [isCapturing]);

  return (
    <div className="bg-white border rounded-lg p-4 my-6">
      <div className="flex justify-between items-center mb-4">
        <h3 className="text-lg font-semibold">RSC 페이로드 디버거</h3>
        <div className="flex gap-2">
          <button
            onClick={() => setIsCapturing(!isCapturing)}
            className={`px-3 py-1 rounded-md text-sm font-medium ${
              isCapturing
                ? "bg-red-500 text-white hover:bg-red-600"
                : "bg-green-500 text-white hover:bg-green-600"
            }`}
          >
            {isCapturing ? "캡처 중지" : "캡처 시작"}
          </button>
          <button
            onClick={() => setRequests([])}
            className="px-3 py-1 bg-gray-200 rounded-md text-sm font-medium hover:bg-gray-300"
          >
            초기화
          </button>
          <button
            onClick={() => setShowHelp(!showHelp)}
            className="px-3 py-1 bg-blue-100 rounded-md text-sm font-medium hover:bg-blue-200"
          >
            {showHelp ? "도움말 숨기기" : "도움말 보기"}
          </button>
        </div>
      </div>

      {showHelp && (
        <div className="bg-blue-50 p-3 rounded-md mb-4 text-sm">
          <p className="font-medium mb-1">RSC 페이로드 디버깅 방법:</p>
          <ol className="list-decimal pl-5 space-y-1">
            <li>아래의 &apos;캡처 시작&apos; 버튼을 클릭합니다.</li>
            <li>
              페이지를 새로고침하거나 다른 페이지로 이동했다가 돌아옵니다.
            </li>
            <li>
              캡처된 네트워크 요청 목록에서 RSC 페이로드 관련 요청을 확인합니다.
            </li>
            <li>각 요청은 실제 네트워크 응답 시간과 크기 정보를 포함합니다.</li>
          </ol>
          <p className="mt-2 text-blue-700">
            <strong>참고:</strong> 크롬 개발자 도구의 네트워크 탭을 함께
            사용하면 더 자세한 정보를 확인할 수 있습니다.
          </p>
        </div>
      )}

      {requests.length > 0 ? (
        <div className="max-h-80 overflow-y-auto">
          <table className="min-w-full text-sm">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-4 py-2 text-left">URL</th>
                <th className="px-4 py-2 text-left">타입</th>
                <th className="px-4 py-2 text-left">시간(ms)</th>
                <th className="px-4 py-2 text-left">크기</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {requests.map((entry, index) => (
                <tr key={index} className="hover:bg-gray-50">
                  <td className="px-4 py-2 truncate max-w-[200px]">
                    {entry.name.split("/").pop()}
                  </td>
                  <td className="px-4 py-2">{entry.initiatorType}</td>
                  <td className="px-4 py-2">{Math.round(entry.duration)}</td>
                  <td className="px-4 py-2">
                    {formatBytes(entry.transferSize)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <div className="text-center py-8 text-gray-500">
          {isCapturing
            ? "네트워크 활동을 기다리는 중... 페이지를 새로고침하거나 다른 페이지로 이동해보세요."
            : "캡처 시작 버튼을 클릭하여 RSC 페이로드 모니터링을 시작하세요."}
        </div>
      )}
    </div>
  );
}

// 바이트 크기를 사람이 읽기 쉬운 형식으로 변환
function formatBytes(bytes: number, decimals = 2) {
  if (bytes === 0) return "0 Bytes";

  const k = 1024;
  const dm = decimals < 0 ? 0 : decimals;
  const sizes = ["Bytes", "KB", "MB", "GB", "TB"];

  const i = Math.floor(Math.log(bytes) / Math.log(k));

  return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
}
