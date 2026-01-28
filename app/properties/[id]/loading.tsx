export default function PropertyDetailLoading() {
  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm sticky top-0 z-30">
        <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
          <div className="flex h-20 items-center justify-between">
            <div className="h-16 w-48 bg-gray-200 rounded animate-pulse"></div>
            <div className="h-8 w-32 bg-gray-200 rounded animate-pulse"></div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8 py-8">
        {/* Breadcrumbs Skeleton */}
        <div className="flex items-center gap-2 mb-6">
          <div className="h-4 w-16 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 w-20 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 w-4 bg-gray-200 rounded animate-pulse"></div>
          <div className="h-4 w-24 bg-gray-200 rounded animate-pulse"></div>
        </div>

        {/* Title Skeleton */}
        <div className="mb-8">
          <div className="h-10 w-3/4 bg-gray-200 rounded animate-pulse mb-4"></div>
          <div className="h-6 w-1/2 bg-gray-200 rounded animate-pulse"></div>
        </div>

        {/* Image Gallery Skeleton */}
        <div className="h-[500px] bg-gray-200 rounded-xl animate-pulse mb-8"></div>

        {/* Two Column Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Main Content Column */}
          <div className="lg:col-span-2 space-y-6">
            {/* Key Features Skeleton */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-4"></div>
              <div className="grid grid-cols-4 gap-4">
                {[1, 2, 3, 4].map((i) => (
                  <div key={i} className="h-24 bg-gray-100 rounded-lg animate-pulse"></div>
                ))}
              </div>
            </div>

            {/* Description Skeleton */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-4"></div>
              <div className="space-y-3">
                <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-full bg-gray-200 rounded animate-pulse"></div>
                <div className="h-4 w-3/4 bg-gray-200 rounded animate-pulse"></div>
              </div>
            </div>

            {/* Amenities Skeleton */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="h-6 w-32 bg-gray-200 rounded animate-pulse mb-4"></div>
              <div className="grid grid-cols-2 gap-3">
                {[1, 2, 3, 4, 5, 6].map((i) => (
                  <div key={i} className="h-6 bg-gray-100 rounded animate-pulse"></div>
                ))}
              </div>
            </div>
          </div>

          {/* Sidebar Column */}
          <div className="space-y-6">
            {/* Price Card Skeleton */}
            <div className="bg-white rounded-xl shadow-lg p-6">
              <div className="h-12 w-full bg-gray-200 rounded animate-pulse mb-6"></div>
              <div className="space-y-3 mb-6">
                <div className="h-4 w-full bg-gray-100 rounded animate-pulse"></div>
                <div className="h-4 w-full bg-gray-100 rounded animate-pulse"></div>
              </div>
              <div className="h-12 w-full bg-purple-200 rounded-lg animate-pulse"></div>
            </div>

            {/* Landlord Card Skeleton */}
            <div className="bg-white rounded-xl shadow-sm p-6">
              <div className="h-6 w-24 bg-gray-200 rounded animate-pulse mb-4"></div>
              <div className="flex items-center gap-4">
                <div className="w-14 h-14 bg-gray-200 rounded-full animate-pulse"></div>
                <div className="flex-1 space-y-2">
                  <div className="h-5 w-32 bg-gray-200 rounded animate-pulse"></div>
                  <div className="h-4 w-24 bg-gray-100 rounded animate-pulse"></div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}
