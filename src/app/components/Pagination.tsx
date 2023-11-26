// Pagination.tsx
import React from "react";

interface PaginationProps {
  itemsPerPage: number;
  totalItems: number;
  paginate: (pageNumber: number) => void;
}

const Pagination: React.FC<PaginationProps> = ({ itemsPerPage, totalItems, paginate }) => {
  const pageNumbers = Array.from({ length: Math.ceil(totalItems / itemsPerPage) }, (_, index) => index + 1);

  return (
    <div className="flex justify-center mt-4">
      {pageNumbers.map((pageNumber) => (
        <button key={pageNumber} onClick={() => paginate(pageNumber)} className="mx-1 px-3 py-2 bg-gray-500 text-white rounded">
          {pageNumber}
        </button>
      ))}
    </div>
  );
};

export default Pagination;
