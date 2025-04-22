'use client';

import { useState, useEffect, useRef } from 'react';
import TableHeader from './TableHeader';
import TableRow from './TableRow';

const Table = ({
  isWaiting,
  searchQuery,
  members,
  handleSelectGrade,
  setMembers,
  currentPage,
  totalPages,
  onPageChange,
}: {
  isWaiting: boolean;
  searchQuery: string;
  members: any[];
  handleSelectGrade: (id: number, newGrade: string) => void;
  currentPage: number;
  totalPages: number;
  onPageChange: (newPage: number) => void;
  setMembers: React.Dispatch<React.SetStateAction<any[]>>;
}) => {
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [dropdownPosition, setDropdownPosition] = useState({ top: 0, left: 0 });
  const dropdownRef = useRef<HTMLDivElement | null>(null);

  const filteredMembers = members.filter((member) => {
    if (searchQuery) {
      return member.name.includes(searchQuery);
    } else {
      return isWaiting ? member.approvalStatus === 'PENDING' : true;
    }
  });
  const toggleDropdown = (
    index: number,
    event: React.MouseEvent<HTMLDivElement>
  ) => {
    if (openIndex === index) {
      setOpenIndex(null);
      return;
    }
    const rect = event.currentTarget.getBoundingClientRect();
    setDropdownPosition({
      top: rect.bottom + window.scrollY,
      left: rect.left + rect.width / 2 + window.scrollX,
    });
    setOpenIndex(index);
  };

  const handleClickOutside = (event: MouseEvent) => {
    if (openIndex !== null) {
      const target = event.target as Node;
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(target) &&
        !(target as HTMLElement).closest('.dropdown-trigger')
      ) {
        setOpenIndex(null);
      }
    }
  };

  const updateDropdownPosition = (index: number) => {
    const trigger = document.querySelectorAll('.dropdown-trigger')[
      index
    ] as HTMLElement;
    if (trigger) {
      const rect = trigger.getBoundingClientRect();
      setDropdownPosition({
        top: rect.bottom + window.scrollY,
        left: rect.left + rect.width / 2 + window.scrollX,
      });
    }
  };

  useEffect(() => {
    if (openIndex !== null) {
      document.addEventListener('mousedown', handleClickOutside);
    } else {
      document.removeEventListener('mousedown', handleClickOutside);
    }
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [openIndex]);

  useEffect(() => {
    const handleResize = () => {
      if (openIndex !== null) {
        updateDropdownPosition(openIndex);
      }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [openIndex]);

  return (
    <div className="w-full flex flex-col items-center">
      <div className="w-full h-[595px] max-pad:h-[378px]">
        <TableHeader />
        <div className="rounded-b-[20px] border-t-0 border-2 border-[#808080] overflow-hidden relative h-[526px] max-pad:h-[336px]">
          <div className="overflow-hidden h-full w-full">
            {filteredMembers.map((member, index) => (
              <TableRow
                key={index}
                member={member}
                index={index}
                openIndex={openIndex}
                setOpenIndex={setOpenIndex}
                dropdownRef={dropdownRef}
                dropdownPosition={dropdownPosition}
                toggleDropdown={toggleDropdown}
                handleSelectGrade={handleSelectGrade}
              />
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-center items-center w-[150px] gap-4 mt-8 font-semibold text-2xl max-dt:text-[20px] max-pad:text-sm">
        {totalPages > 0 ? (
          <>
            <button
              onClick={() => onPageChange(currentPage - 1)}
              className={`cursor-pointer ${currentPage === 0 ? 'invisible' : ''}`}
            >
              {'<'}
            </button>
            <div className="flex items-center">
              {currentPage + 1} / {totalPages}
            </div>
            <button
              onClick={() => onPageChange(currentPage + 1)}
              className={`cursor-pointer ${currentPage + 1 >= totalPages ? 'invisible' : ''}`}
            >
              {'>'}
            </button>
          </>
        ) : (
          <div className="w-[150px] h-[32px]" />
        )}
      </div>
    </div>
  );
};

export default Table;
