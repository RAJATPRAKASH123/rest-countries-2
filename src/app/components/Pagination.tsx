import React, { ChangeEvent, KeyboardEvent } from "react";

interface PaginationProps {
  nextPage: () => void;
  prevPage: () => void;
  nPages: number;
  currentPage: number;
  handleEnterKey: (e: KeyboardEvent<HTMLInputElement>) => void;
  handlePageInput: (e: ChangeEvent<HTMLInputElement>) => void;
  pageInput: number;
}

const Pagination: React.FC<PaginationProps> = ({
  nextPage,
  prevPage,
  nPages,
  currentPage,
  handleEnterKey,
  handlePageInput,
  pageInput,
}) => {
  const disableBtn = (pageNum: number) =>
    currentPage === pageNum ? true : false;

  return (
    <div className="paginationBtns">
      <span>Page  </span>

      <label aria-label="Enter page Number" htmlFor="pageInput"></label>
      <input
        id="pageInput"
        name="pageInput"
        type="number"
        value={pageInput}
        onChange={handlePageInput}
        onKeyUp={handleEnterKey}
        className="w-32 py-3 px-5 outline-none shadow rounded appearance-none dark:bg-gray-800 dark:text-white dark:placeholder-gray-30 dark:focus:bg-gray-700"
      />

      <span> of {nPages}</span>
      <button
        aria-label="Previous Page"
        className="btnPag btnPrev"
        onClick={prevPage}
        disabled={disableBtn(1)}
      >
        <i className="fa fas fa-chevron-left pagination-arrow"></i>
      </button>
      <button
        aria-label="Next Page"
        className="btnPag btnNext"
        onClick={nextPage}
        disabled={disableBtn(nPages)}
      >
        <i className="fa fas fa-chevron-right pagination-arrow"></i>
      </button>
    </div>
  );
};

export default React.memo(Pagination);
