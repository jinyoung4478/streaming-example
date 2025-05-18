import { Suspense } from "react";

// 시뮬레이션된 사용자 데이터를 가져오는 함수
async function fetchUserData(userId: number) {
  // 실제 API 호출을 시뮬레이션하기 위한 지연
  await new Promise((resolve) =>
    setTimeout(resolve, 2000 + Math.random() * 2000)
  );

  return {
    id: userId,
    name: `사용자 ${userId}`,
    email: `user${userId}@example.com`,
    role: userId % 2 === 0 ? "관리자" : "사용자",
    lastLogin: new Date().toISOString(),
  };
}

// 사용자 게시물을 가져오는 함수
async function fetchUserPosts(userId: number) {
  // 실제 API 호출을 시뮬레이션하기 위한 지연
  await new Promise((resolve) =>
    setTimeout(resolve, 3000 + Math.random() * 2000)
  );

  return Array.from({ length: 3 }, (_, i) => ({
    id: i + 1,
    userId,
    title: `사용자 ${userId}의 게시물 ${i + 1}`,
    content: `이것은 사용자 ${userId}가 작성한 게시물 ${i + 1}의 내용입니다.`,
    createdAt: new Date().toISOString(),
  }));
}

// 비동기 사용자 프로필 컴포넌트
async function UserProfile({ userId }: { userId: number }) {
  const userData = await fetchUserData(userId);

  return (
    <div className="bg-white shadow rounded-lg p-4 mb-4">
      <h3 className="text-lg font-medium">{userData.name}</h3>
      <p className="text-gray-600">{userData.email}</p>
      <div className="mt-2 flex items-center">
        <span
          className={`px-2 py-1 text-xs rounded-full ${
            userData.role === "관리자"
              ? "bg-purple-100 text-purple-800"
              : "bg-blue-100 text-blue-800"
          }`}
        >
          {userData.role}
        </span>
        <span className="text-xs text-gray-500 ml-2">
          최근 로그인: {new Date(userData.lastLogin).toLocaleString()}
        </span>
      </div>
    </div>
  );
}

// 비동기 사용자 게시물 컴포넌트
async function UserPosts({ userId }: { userId: number }) {
  const posts = await fetchUserPosts(userId);

  return (
    <div className="space-y-4">
      <h3 className="text-lg font-medium">최근 게시물</h3>
      {posts.map((post) => (
        <div key={post.id} className="bg-white shadow rounded-lg p-4">
          <h4 className="font-medium">{post.title}</h4>
          <p className="text-gray-600 text-sm mt-1">{post.content}</p>
          <p className="text-gray-400 text-xs mt-2">
            작성일: {new Date(post.createdAt).toLocaleString()}
          </p>
        </div>
      ))}
    </div>
  );
}

// 로딩 컴포넌트들
function ProfileLoading() {
  return (
    <div className="bg-white shadow rounded-lg p-4 mb-4 animate-pulse">
      <div className="h-5 bg-gray-200 rounded w-1/3 mb-2"></div>
      <div className="h-4 bg-gray-200 rounded w-1/2 mb-2"></div>
      <div className="h-8 bg-gray-200 rounded w-2/3"></div>
    </div>
  );
}

function PostsLoading() {
  return (
    <div className="animate-pulse">
      <div className="h-5 bg-gray-200 rounded w-1/4 mb-4"></div>
      {[1, 2, 3].map((i) => (
        <div key={i} className="bg-white shadow rounded-lg p-4 mb-4">
          <div className="h-4 bg-gray-200 rounded w-3/4 mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-full mb-2"></div>
          <div className="h-3 bg-gray-200 rounded w-1/3"></div>
        </div>
      ))}
    </div>
  );
}

// 메인 컴포넌트
export default function StreamingApiExample() {
  // 예제를 위한 사용자 ID 배열
  const userIds = [1, 2, 3];

  return (
    <div className="space-y-8">
      <h2 className="text-2xl font-bold">사용자 프로필 스트리밍 예제</h2>
      <p className="text-gray-600">
        이 예제는 각 사용자의 프로필과 게시물을 독립적으로 스트리밍하는 방법을
        보여줍니다. 각 컴포넌트는 데이터가 준비되는 대로 점진적으로 표시됩니다.
      </p>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {userIds.map((userId) => (
          <div key={userId} className="bg-gray-50 p-4 rounded-lg">
            <h3 className="text-lg font-bold mb-4">사용자 ID: {userId}</h3>

            <Suspense fallback={<ProfileLoading />}>
              <UserProfile userId={userId} />
            </Suspense>

            <Suspense fallback={<PostsLoading />}>
              <UserPosts userId={userId} />
            </Suspense>
          </div>
        ))}
      </div>
    </div>
  );
}
