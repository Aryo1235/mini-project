import { Card } from "flowbite-react";

const SkeletonLoader = () => {
  return (
    <div className="animate-pulse w-full max-w-80 flex flex-col items-center">
      {/* Card Wrapper */}
      <Card className="text-center p-5 container">
        {/* Header Skeleton */}
        <div className="text-center h-10 bg-gray-300 rounded w-3/4 mb-4"></div>

        {/* Device Info Skeleton */}
        <div className="space-y-2 mb-6">
          <div className="h-6 bg-gray-300 rounded w-1/2"></div>
          <div className="h-6 bg-gray-300 rounded w-1/3"></div>
        </div>

        {/* Golongan Selector Skeleton */}
        <div className="mb-6">
          <div className="h-8 bg-gray-300 rounded w-full"></div>
        </div>

        {/* Estimator Skeleton */}
        <div className="space-y-2 mb-6">
          <div className="h-6 bg-gray-300 rounded w-1/2"></div>
          <div className="h-8 bg-gray-300 rounded w-2/3"></div>
        </div>

        {/* Tips Skeleton */}
        <div className="space-y-2 ">
          <div className="h-10 bg-gray-300 rounded w-3/4"></div>
          <div className="h-20 bg-gray-300 rounded w-3/4"></div>
        </div>

        {/* Button Skeleton */}
        <div className="mt-6 flex justify-center">
          <div className="h-12 bg-gray-300 rounded w-1/3"></div>
        </div>
      </Card>
    </div>
  );
};

export default SkeletonLoader;
