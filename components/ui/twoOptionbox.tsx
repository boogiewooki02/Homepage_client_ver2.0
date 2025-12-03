'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';

interface TwoOptionProps {
  option1: string;
  option2: string;
  seletion: (selected: string) => void;
  className: string;
}

const TwoOptionBox = ({
  option1,
  option2,
  seletion,
  className,
}: TwoOptionProps) => {
  const [selected, setSelected] = useState<string>(option1);

  useEffect(() => {
    seletion(selected);
  }, [selected]);

  return (
    <div className={`flex flex-row gap-4 pad:flex-col ${className}`}>
      <div
        onClick={() => setSelected(option1)}
        className={`mt-2 flex items-center justify-between px-4 h-12 w-[156px] pad:w-[282px] rounded-xl border ${selected === option1 ? 'border-primary-50 text-primary-50' : 'border-gray-40 text-gray-90'} bg-gray-0 text-[16px] font-normal leading-6 text-center`}
      >
        {option1}
        {selected === option1 && (
          <Image
            src="/image/ticket/check.svg"
            width={20}
            height={20}
            alt="text"
            className=""
          />
        )}
      </div>
      <div
        onClick={() => setSelected(option2)}
        className={`mt-2 pad:mt-0 flex items-center justify-between px-4 h-12 w-[156px] pad:w-[282px] rounded-xl border ${selected === option2 ? 'border-primary-50 text-primary-50' : 'border-gray-40 text-gray-90'} bg-gray-0 text-[16px] font-normal leading-6 text-center`}
      >
        {option2}
        {selected === option2 && (
          <Image
            src="/image/ticket/check.svg"
            width={20}
            height={20}
            alt="text"
            className=""
          />
        )}
      </div>
    </div>
  );
};

export default TwoOptionBox;
