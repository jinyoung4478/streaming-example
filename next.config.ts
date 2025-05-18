import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 캐싱을 방지하기 위한 설정
  unstable_skipMiddlewareUrlNormalize: true,
  staticPageGenerationTimeout: 0,
  // 동적 렌더링 강제
  reactStrictMode: true,
};

export default nextConfig;
