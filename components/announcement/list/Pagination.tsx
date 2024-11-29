import React from 'react';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

interface PaginationProps {
  currentPage: number;
  totalPages: number;
  pageGroup: number;
  pagesPerGroup: number;
  onPageChange: (page: number) => void;
  onPrevGroup: () => void;
  onNextGroup: () => void;
}

const Pagination: React.FC<PaginationProps> = ({
  currentPage,
  totalPages,
  pageGroup,
  pagesPerGroup,
  onPageChange,
  onPrevGroup,
  onNextGroup,
}) => {
  const startPage = pageGroup * pagesPerGroup + 1;
  const endPage = Math.min(startPage + pagesPerGroup - 1, totalPages);

  return (
    <div className="flex justify-center gap-3 mt-10 items-center">
      {/* 이전 그룹 버튼 */}
      <button
        onClick={onPrevGroup}
        className="flex items-center w-[30px] h-[30px] rotate-180"
        disabled={pageGroup === 0}
      >
        {pageGroup > 0 ? (
          <ChevronRightIcon sx={{ color: '#000000' }} />
        ) : (
          <ChevronRightIcon sx={{ color: '#9296AB' }} />
        )}
      </button>

      {/* 페이지 번호 */}
      {Array.from({ length: endPage - startPage + 1 }, (_, index) => (
        <div
          key={startPage + index}
          onClick={() => onPageChange(startPage + index)}
          className={`w-[30px] h-[30px] cursor-pointer rounded-full flex justify-center items-center ${
            currentPage === startPage + index
              ? 'border-[1px] border-black'
              : 'border-none'
          } `}
        >
          <span
            className={`font-[500] text-[20px] ${
              currentPage === startPage + index ? 'text-black' : 'text-gray-40'
            }`}
          >
            {startPage + index}
          </span>
        </div>
      ))}

      {/* 다음 그룹 버튼 */}
      <button
        onClick={onNextGroup}
        className="flex items-center w-[30px] h-[30px]"
        disabled={(pageGroup + 1) * pagesPerGroup >= totalPages}
      >
        {(pageGroup + 1) * pagesPerGroup < totalPages ? (
          <ChevronRightIcon sx={{ color: '#000000' }} />
        ) : (
          <ChevronRightIcon sx={{ color: '#9296AB' }} />
        )}
      </button>
    </div>
  );
};

export default Pagination;
