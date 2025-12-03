'use client';

import Image from 'next/image';
import React, { useEffect, useState } from 'react';
import { useRecoilState } from 'recoil';

import { selectedYear } from '@/atoms';
import chevron_down from '@/public/image/performance/chevron-down.svg';
import chevron_up from '@/public/image/performance/chevron-up.svg';

const YearSelector = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [sYear, setSYear] = useRecoilState(selectedYear);
  const [width, setWidth] = useState(
    typeof window !== 'undefined' ? window.innerWidth : 0
  );

  const years = ['All', '2024', '2023', '2022', '2019', '2018', '2017', '2016'];
  const year1 = ['All', '2024', '2023', '2022'];
  const year2 = ['2019', '2018', '2017', '2016'];
  const currentYearList = year2.includes(sYear) ? year2 : year1;

  const handleResize = () => {
    setWidth(window.innerWidth);
  };

  const toggleBtn = () => {
    setIsOpen(!isOpen);
  };

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div className="flex gap-2 mt-16 relative mx-4">
      {/* 연도 4개만 표시 */}
      <div className="max-w-[336px] h-[32px] bg-gray-0 rounded-[32px]">
        {width > 408
          ? currentYearList.map((year) => (
              <div
                key={year}
                onClick={() => {
                  setSYear(year);
                }}
                className={`${sYear === year ? 'bg-primary-50' : 'bg-gray-0'} " w-[84px] inline-flex px-[12px] py-[4px] justify-center items-center gap-[10px] rounded-[32px] cursor-pointer "`}
              >
                <p
                  key={year}
                  className={`${sYear === year ? 'text-gray-0' : 'text-gray-50'} " text-center font-pretendard text-[16px] font-normal leading-6 "`}
                >
                  {year}
                </p>
              </div>
            ))
          : currentYearList
              .filter((year) => year === sYear)
              .map((year) => (
                <div
                  key={year}
                  onClick={() => {
                    setSYear(year);
                  }}
                  className={`${sYear === year ? 'bg-primary-50' : 'bg-gray-0'} " w-[84px] inline-flex px-[12px] py-[4px] justify-center items-center gap-[10px] rounded-[32px] border-primary-50 cursor-pointer "`}
                >
                  <p
                    key={year}
                    className={`${sYear === year ? 'text-gray-0' : 'text-gray-50'} " text-center font-pretendard text-[16px] font-normal leading-6 "`}
                  >
                    {year}
                  </p>
                </div>
              ))}
      </div>

      {/* 토글 버튼 */}
      {isOpen ? (
        <div
          className="w-8 h-8 rounded-full bg-primary-50 flex justify-center items-center cursor-pointer"
          onClick={toggleBtn}
        >
          <Image src={chevron_up} alt="up" width={24} height={24} />
        </div>
      ) : (
        <div
          className="w-8 h-8 rounded-full bg-gray-0 flex justify-center items-center cursor-pointer"
          onClick={toggleBtn}
        >
          <Image src={chevron_down} alt="down" width={24} height={24} />
        </div>
      )}

      {/* 전체 연도 카드 */}
      {isOpen &&
        (width > 408 ? (
          <div className="max-w-[360px] absolute top-8 -left-4 ml-1 grid grid-cols-4 bg-gray-0 p-3 mt-4 gap-3 rounded-2xl shadow-[0_0_24px_0px_rgba(27,28,35,0.25)]">
            {years.map((year) => (
              <div
                key={year}
                onClick={() => {
                  setSYear(year);
                  toggleBtn();
                }}
                className={`${sYear === year ? 'bg-primary-50' : 'bg-gray-0'} px-[12px] py-[4px] flex justify-center items-center gap-[10px] cursor-pointer rounded-[32px]`}
              >
                <p
                  className={`${sYear === year ? 'text-gray-0' : 'text-gray-50'} w-[60px] justify-center flex items-center text-center font-pretendard text-base font-normal`}
                >
                  {year}
                </p>
              </div>
            ))}
          </div>
        ) : (
          <div className="w-[108px] h-[232px] overflow-y-scroll scrollbar-hide absolute top-8 -left-4 ml-1 grid grid-cols-1 bg-gray-0 p-3 mt-4 gap-3 rounded-2xl shadow-[0_0_24px_0px_rgba(27,28,35,0.25)]">
            {years.map((year) => (
              <div
                key={year}
                onClick={() => {
                  setSYear(year);
                  toggleBtn();
                }}
                className={`${sYear === year ? 'bg-primary-50' : 'bg-gray-0'} px-[12px] py-[4px] justify-center items-center gap-[10px] cursor-pointer rounded-[32px]`}
              >
                <p
                  className={`${sYear === year ? 'text-gray-0' : 'text-gray-50'} w-[60px] justify-center items-center text-center font-pretendard text-base font-normal`}
                >
                  {year}
                </p>
              </div>
            ))}
          </div>
        ))}
    </div>
  );
};

export default YearSelector;
