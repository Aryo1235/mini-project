// SkeletonCard.js
const SkeletonCard = ({ itemsPerPage }) => {
  return (
    <>
      {Array.from({ length: itemsPerPage }).map((_, index) => (
        <div
          key={index}
          className="p-4 border rounded-lg shadow-md animate-pulse h-56 space-y-6"
        >
          <div className="h-4 py-3 bg-gray-300 rounded w-3/4 mb-2"></div>
          <div className="h-4 py-3 bg-gray-300 rounded w-1/2 mb-4"></div>
          <div className="h-4 py-3 bg-gray-300 rounded w-5/6 mb-4"></div>
          <div className="flex space-x-2 mt-4">
            <div className="h-8 py-5 bg-gray-300 rounded w-14"></div>
            <div className="h-8 py-5 bg-gray-300 rounded w-16"></div>
          </div>
        </div>
      ))}
    </>
  );
};

export default SkeletonCard;
