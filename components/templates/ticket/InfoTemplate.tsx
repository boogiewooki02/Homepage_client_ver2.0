'use client';
import React, { useState } from 'react';
import { Input } from '@/components/ui/InputBox';
import Image from 'next/image';
import { filterPhoneNumber, filterNameValue } from '@/utils/filterUtils';

interface InfoTemplateProps {
  index: number;
  member: number;
  role: string;
  handleBuyerChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handleNamesArrayChange?: (value: string) => void;
  handlePhoneChange?: (event: React.ChangeEvent<HTMLInputElement>) => void;
  handlePhonesArrayChange?: (value: string) => void;
  setMember?: React.Dispatch<React.SetStateAction<number>>;
  companion?: number;
  removeCompanion?: (index: number) => void;
}

const InfoTemplate: React.FC<InfoTemplateProps> = ({
  index,
  role,
  member,
  handleBuyerChange,
  handleNamesArrayChange,
  handlePhoneChange,
  handlePhonesArrayChange,
  setMember,
  companion,
  removeCompanion,
}) => {
  const [phoneValue, setPhoneValue] = useState('');
  const [nameValue, setNameValue] = useState('');

  const isLastCompanion = index === member - 1;

  const handlePhoneInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputValue = event.target.value;
    const formattedValue = filterPhoneNumber(inputValue);
    setPhoneValue(formattedValue);
    const rawValue = inputValue.replace(/[^0-9]/g, '');
    role === '예매자'
      ? handlePhoneChange?.(event)
      : handlePhonesArrayChange?.(rawValue);
  };

  const handleNameInputChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const inputValue = event.target.value;
    const filteredValue = filterNameValue(inputValue);
    setNameValue(filteredValue);

    if (role === '예매자') {
      handleBuyerChange?.(event);
    } else {
      handleNamesArrayChange?.(filteredValue);
    }
  };

  return (
    <div>
      <div className="w-[282px] flex flex-row justify-between">
        <p className="mt-6 text-[16px] font-normal leading-6">{role}</p>
        {role !== '예매자' && isLastCompanion && (
          <div
            className="pad:hidden cursor-pointer mt-6"
            onClick={() => removeCompanion?.(index)}
          >
            <Image
              src="/image/ticket/subtract.svg"
              alt="minus"
              height={24}
              width={24}
            />
          </div>
        )}
      </div>
      <div className="flex flex-col pad:flex-row mt-2 gap-4 pad:gap-6">
        <Input
          type="text"
          placeholder="이름"
          value={nameValue}
          onChange={handleNameInputChange}
        />
        <Input
          type="text"
          placeholder="전화번호 -없이 입력"
          value={phoneValue}
          onChange={handlePhoneInputChange}
        />
        {role !== '예매자' && isLastCompanion && (
          <div
            className="hidden pad:flex cursor-pointer w-12"
            onClick={() => removeCompanion?.(index)}
          >
            <Image
              src="/image/ticket/subtract.svg"
              alt="minus"
              height={24}
              width={24}
            />
          </div>
        )}
      </div>
    </div>
  );
};

export default InfoTemplate;
