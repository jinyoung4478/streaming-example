import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // 캐싱을 방지하기 위한 설정
  staticPageGenerationTimeout: 60,
  // 동적 렌더링 강제
  reactStrictMode: true,
  // 에러 페이지 사용자 정의 방지
  skipTrailingSlashRedirect: true,
  swcMinify: true,
};

export default nextConfig;
