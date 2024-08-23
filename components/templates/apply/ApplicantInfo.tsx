import { Input } from '@/components/ui/InputBox';
import TwoOptionBox from '@/components/ui/twoOptionbox';
import {
  filterBirthdateValue,
  filterPhoneNumber,
} from '@/components/util/utils';
import React, { useEffect, useState } from 'react';

export enum Gender {
  남성,
  여성,
}

const GenderNameMap = {
  [Gender.남성]: 'MALE',
  [Gender.여성]: 'FEMALE',
};

const StringToEnum = (gender: string): Gender => {
  const enumValue = (Gender as any)[gender as keyof typeof Gender];
  return enumValue as Gender;
};

interface ApplicantInfoProps {
  onInfoChange: (info: {
    name: string;
    birth_date: string;
    phone_num: string;
    major: string;
    address: string;
    gender: string;
  }) => void;
  PersonalInfo: {
    name: string;
    birth_date: string;
    phone_num: string;
    major: string;
    address: string;
    gender: string;
  };
}

const ApplicantInfo: React.FC<ApplicantInfoProps> = ({
  onInfoChange,
  PersonalInfo,
}) => {
  const { name, birth_date, phone_num, major, address, gender } = PersonalInfo;

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onInfoChange({ ...PersonalInfo, name: event.target.value });
  };

  const handleBirthdateChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    const cleanedBirthdateValue = filterBirthdateValue(event.target.value);
    onInfoChange({ ...PersonalInfo, birth_date: cleanedBirthdateValue });
  };

  const handlePhoneNumChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const cleanedPhonenumValue = filterPhoneNumber(event.target.value);
    onInfoChange({ ...PersonalInfo, phone_num: cleanedPhonenumValue });
  };

  const handleMajorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onInfoChange({ ...PersonalInfo, major: event.target.value });
  };

  const handleAddressChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    onInfoChange({ ...PersonalInfo, address: event.target.value });
  };

  const handleGenderChange = (selectedGender: string) => {
    onInfoChange({
      ...PersonalInfo,
      gender: `${GenderNameMap[StringToEnum(selectedGender)]}`,
    });
  };

  return (
    <div className="flex flex-col py-10 px-4 pad:px-12">
      <div className="flex flex-col pad:flex-row gap-1 pad:gap-3 pad:items-end">
        <p className="text-gray-90 text-[20px] font-medium">지원자 인적사항</p>
        <p className="text-gray-40 text-[16px] font-normal">
          신입생 확인을 위해 정확한 정보를 입력해주세요.
        </p>
      </div>
      <div className="flex flex-col">
        <p className="mt-6 text-[16px] font-light leading-6">이름</p>
        <Input
          className="mt-2"
          type="text"
          value={name}
          onChange={handleNameChange}
          placeholder="예) 홍길동"
        />
        <p className="mt-6 text-[16px] font-light leading-6">생년월일</p>
        <Input
          className="mt-2"
          type="text"
          value={birth_date}
          onChange={handleBirthdateChange}
          placeholder="8자리로 입력해주세요"
        />
        <p className="mt-6 text-[16px] font-light leading-6">전화번호</p>
        <Input
          className="mt-2"
          type="text"
          value={phone_num}
          onChange={handlePhoneNumChange}
          placeholder="전화번호 -없이 입력"
        />
        <p className="mt-6 text-[16px] font-light leading-6">성별</p>
        <TwoOptionBox
          option1={Gender[0].toString()}
          option2={Gender[1].toString()}
          seletion={handleGenderChange}
          className=""
        />
        <p className="mt-6 text-[16px] font-light leading-6">학과</p>
        <Input
          className="mt-2"
          type="text"
          value={major}
          onChange={handleMajorChange}
          placeholder="예) 컴퓨터공학과"
        />
        <p className="mt-6 text-[16px] font-light leading-6">거주지</p>
        <Input
          className="mt-2 w-full pad:w-[588px]"
          type="text"
          value={address}
          onChange={handleAddressChange}
          placeholder="기숙사의 경우 '예) 2기숙사/부산'"
        />
      </div>
    </div>
  );
};

export default ApplicantInfo;
