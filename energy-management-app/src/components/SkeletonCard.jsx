import { Card } from "flowbite-react";

// SkeletonCard.js
const SkeletonCard = ({ itemsPerPage }) => {
  return (
    <>
      {Array.from({ length: itemsPerPage }).map((_, index) => (
        <Card key={index} className="p-3 shadow-md animate-pulse  ">
          <div className="mx-auto h-4 py-3 bg-gray-300 rounded w-2/3 mb-2 mt-5"></div>
          <div className="h-4 py-3 bg-gray-300 rounded w-2/6 "></div>
          <div className="h-4 py-3 bg-gray-300 rounded w-1/2 "></div>
          <div className="h-4 py-3 bg-gray-300 rounded w-5/6 "></div>
          <div className="flex space-x-2 my-3">
            <div className="h-8 py-5 bg-gray-300 rounded w-14"></div>
            <div className="h-8 py-5  bg-gray-300 rounded w-16"></div>
          </div>
        </Card>
      ))}
    </>
  );
};

export default SkeletonCard;
