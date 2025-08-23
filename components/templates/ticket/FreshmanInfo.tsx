import React, { useState } from 'react';
import { Input } from '@/components/ui/InputBox';
import {
  filterDepartmentValue,
  filterNameValue,
  filterStudentIdValue,
  filterPhoneNumber,
  filterEmailValue,
} from '@/utils/filterUtils';

interface FreshmanInfoProps {
  onInfoChange: (info: {
    name: string;
    department: string;
    studentId: string;
    phone_num: string;
    email: string;
  }) => void;
  userInfo: {
    name: string;
    department: string;
    studentId: string;
    phone_num: string;
    email: string;
  };
}

const FreshmanInfo: React.FC<FreshmanInfoProps> = ({
  onInfoChange,
  userInfo,
}) => {
  const [phoneValue, setPhoneValue] = useState(userInfo.phone_num || '');
  const [nameValue, setNameValue] = useState(userInfo.name || '');
  const [departmentValue, setDepartmentValue] = useState(
    userInfo.department || ''
  );
  const [studentIdValue, setStudentIdValue] = useState(
    userInfo.studentId || ''
  );
  const [emailValue, setEmailValue] = useState(userInfo.email || '');

  const handleInputChange = (
    setter: React.Dispatch<React.SetStateAction<string>>,
    filterFn: (value: string) => string
  ) => {
    return (event: React.ChangeEvent<HTMLInputElement>) => {
      const filteredValue = filterFn(event.target.value);
      setter(filteredValue);

      onInfoChange({
        name: setter === setNameValue ? filteredValue : nameValue,
        department:
          setter === setDepartmentValue ? filteredValue : departmentValue,
        studentId:
          setter === setStudentIdValue ? filteredValue : studentIdValue,
        phone_num: setter === setPhoneValue ? filteredValue : phoneValue,
        email: setter === setEmailValue ? filteredValue : emailValue,
      });
    };
  };

  return (
    <div className="flex flex-col mt-10 mb-10 w-full px-4 pad:px-12">
      <div className="flex flex-col pad:flex-row h-[55px] pad:h-[30px]">
        <div className="font-semibold text-lg pad:text-xl leading-[30px] text-gray-90">
          예매자 정보 입력
        </div>
        <div className="flex pad:ml-3 font-medium text-[16px] leading-6 text-gray-40 items-center">
          신입생 확인을 위해 정확한 정보를 입력해주세요.
        </div>
      </div>
      <div className="flex flex-col">
        <p className="mt-6 text-[16px] font-normal leading-6">이름</p>
        <Input
          className="mt-2"
          type="text"
          value={nameValue}
          onChange={handleInputChange(setNameValue, filterNameValue)}
          placeholder="예) 홍길동"
        />
        <p className="mt-6 text-[16px] font-normal leading-6">학과</p>
        <Input
          className="mt-2"
          type="text"
          value={departmentValue}
          onChange={handleInputChange(
            setDepartmentValue,
            filterDepartmentValue
          )}
          placeholder="예) 컴퓨터공학과"
        />
        <p className="mt-6 text-[16px] font-normal leading-6">학번</p>
        <Input
          className="mt-2"
          type="text"
          value={studentIdValue}
          onChange={handleInputChange(setStudentIdValue, filterStudentIdValue)}
          placeholder="예) C123456"
        />
        <p className="mt-6 text-[16px] font-normal leading-6">연락처</p>
        <Input
          className="mt-2"
          type="text"
          value={phoneValue}
          onChange={handleInputChange(setPhoneValue, filterPhoneNumber)}
          placeholder="전화번호 -없이 입력"
        />
        <p className="mt-6 text-[16px] font-normal leading-6">이메일</p>
        <Input
          className="mt-2"
          type="text"
          value={emailValue}
          onChange={handleInputChange(setEmailValue, filterEmailValue)}
          placeholder="예) kahluaband@gmail.com"
        />
      </div>
    </div>
  );
};

export default FreshmanInfo;
