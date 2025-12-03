'use client';

import Image from 'next/image';
import { useState } from 'react';

import SearchIcon from '@/public/image/admin/SearchIcon.svg';

interface SearchBarProps {
  searchQuery: string;
  setSearchQuery: (query: string) => void;
}

const SearchBar = ({ searchQuery, setSearchQuery }: SearchBarProps) => {
  const [isComposing, setIsComposing] = useState(false);

  const handleSearch = () => {
    if (!searchQuery.trim()) return;
  };

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (isComposing) return;
    if (e.key === 'Enter') {
      handleSearch();
    }
  };

  return (
    <div className="flex box-border items-center w-[403px] max-dt:w-[329px] max-pad:w-[138px] h-[62px] max-pad:h-[33px] border-2 max-pad:border-[1px] border-black rounded-[30px] pl-[25px] max-dt:pl-[24px] max-pad:pl-3">
      <input
        placeholder="이름 검색"
        value={searchQuery}
        onChange={(e) => setSearchQuery(e.target.value)}
        onKeyDown={handleKeyDown}
        onCompositionStart={() => setIsComposing(true)}
        onCompositionEnd={() => setIsComposing(false)}
        className="outline-none flex-grow min-w-0 flex-1 text-2xl max-pad:text-sm font-semibold"
      />
      <Image
        src={SearchIcon}
        width={25}
        height={25}
        alt="검색"
        className="cursor-pointer mx-[20px] max-dt:ml-[12px] max-pad:mx-2 max-dt:h-[23px] max-pad:w-3 max-pad:h-3"
        onClick={handleSearch}
      />
    </div>
  );
};

export default SearchBar;
