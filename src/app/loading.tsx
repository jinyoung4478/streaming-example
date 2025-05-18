export default function Loading() {
  return (
    <div className="max-w-4xl mx-auto p-6">
      <div className="animate-pulse">
        <div className="h-8 w-3/4 bg-gray-200 rounded mb-6"></div>

        <div className="mb-8">
          <div className="h-6 w-1/2 bg-gray-200 rounded mb-4"></div>
          <div className="h-4 w-full bg-gray-200 rounded mb-4"></div>
          <div className="h-20 w-full bg-gray-200 rounded"></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
          <div>
            <div className="h-6 w-1/2 bg-gray-200 rounded mb-4"></div>
            <div className="h-24 w-full bg-gray-200 rounded"></div>
          </div>

          <div>
            <div className="h-6 w-1/2 bg-gray-200 rounded mb-4"></div>
            <div className="h-24 w-full bg-gray-200 rounded"></div>
          </div>
        </div>

        <div className="space-y-4 mb-8">
          {[1, 2, 3, 4, 5].map((i) => (
            <div key={i} className="border p-4 rounded-lg">
              <div className="h-5 w-1/4 bg-gray-200 rounded mb-2"></div>
              <div className="h-20 w-full bg-gray-200 rounded"></div>
            </div>
          ))}
        </div>

        <div className="h-40 w-full bg-gray-200 rounded"></div>
      </div>
    </div>
  );
}
