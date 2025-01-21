'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';
import ApplicantInfo from '@/components/templates/apply/ApplicantInfo';
import CLInfo from '@/components/templates/apply/CLInfo';
import OtherInfo from '@/components/templates/apply/OtherInfo';
import LastCheckModal from '@/components/popups/ticket/LastCheckModal';
import { axiosInstance } from '@/api/auth/axios';

const page = () => {
  const [PersonalInfo, setPersonalInfo] = useState({
    name: '',
    birth_date: '',
    phone_num: '',
    major: '',
    address: '',
    gender: '',
    email: '',
  });

  const [CoverLetterInfo, setCoverLetterInfo] = useState({
    session1: '',
    session2: '',
    motivation: '',
    career: '',
    instrument: '',
    determination: '',
  });

  const [AdditionalInfo, setOtherInfo] = useState({
    schedule: '',
    afterparty: true,
  });

  const handlePersonalInfoChange = (info: {
    name: string;
    birth_date: string;
    phone_num: string;
    major: string;
    address: string;
    gender: string;
    email: string;
  }) => {
    setPersonalInfo((prevState) => ({
      ...prevState,
      ...info,
    }));
  };

  const handleCLInfoChange = (info: {
    session1: string;
    session2: string;
    motivation: string;
    career: string;
    instrument: string;
    determination: string;
  }) => {
    setCoverLetterInfo((prevState) => ({
      ...prevState,
      ...info,
    }));
  };

  const handleOtherInfoChange = (info: {
    schedule: string;
    afterparty: boolean;
  }) => {
    setOtherInfo((prevState) => ({
      ...prevState,
      ...info,
    }));
  };

  const [isComplete, setIsComplete] = useState(false);
  const [showLastCheckModal, setShowLastCheckModal] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  useEffect(() => {
    const isDataComplete =
      PersonalInfo.birth_date.trim() !== '' &&
      PersonalInfo.major.trim() !== '' &&
      PersonalInfo.gender.trim() !== '' &&
      PersonalInfo.name.trim() !== '' &&
      PersonalInfo.phone_num.trim() !== '' &&
      PersonalInfo.address.trim() !== '' &&
      PersonalInfo.email.trim() !== '' &&
      CoverLetterInfo.career.trim() !== '' &&
      CoverLetterInfo.determination.trim() !== '' &&
      CoverLetterInfo.instrument.trim() !== '' &&
      CoverLetterInfo.motivation.trim() !== '' &&
      CoverLetterInfo.session1 !== 'undefined' &&
      CoverLetterInfo.session2 !== 'undefined' &&
      AdditionalInfo.schedule.trim() !== '';

    setIsComplete(isDataComplete);
  }, [PersonalInfo, CoverLetterInfo, AdditionalInfo]);

  const handleApplicationSubmit = async () => {
    if (isComplete && !isSubmitting) {
      if (!validateEmail(PersonalInfo.email)) {
        alert('유효하지 않은 이메일 형식입니다. 다시 확인해주세요.');
        return;
      }

      setIsSubmitting(true);
      try {
        const formData = {
          name: PersonalInfo.name,
          birth_date: PersonalInfo.birth_date,
          phone_num: PersonalInfo.phone_num,
          major: PersonalInfo.major,
          address: PersonalInfo.address,
          gender: PersonalInfo.gender,
          first_preference: CoverLetterInfo.session1,
          second_preference: CoverLetterInfo.session2,
          experience_and_reason: CoverLetterInfo.career,
          play_instrument: CoverLetterInfo.instrument,
          motive: CoverLetterInfo.motivation,
          finish_time: AdditionalInfo.schedule,
          meeting: AdditionalInfo.afterparty,
          readiness: CoverLetterInfo.determination,
          email: PersonalInfo.email,
        };

        const response = await axiosInstance.post('/apply', formData, {
          headers: {
            'Content-Type': 'application/json',
          },
        });
        console.log(response.data);

        if (response.status === 200) {
          window.location.href = `/recruit/complete`;
        } else {
          alert('지원 실패 다시 시도해주세요');
        }
      } catch (error: any) {}
    }
  };

  return (
    <div className="flex flex-col relative top-16 items-center justify-start text-center mx-auto w-full pad:w-[786px] dt:w-[996px] h-auto mt-4 ">
      <div className="h-[200px] w-full pad:rounded-t-xl bg-gray-90 flex flex-col mx-auto">
        <p className="mt-10 text-gray-0 text-center text-[24px] pad:text-[32px] font-semibold leading-[48px]">
          지원 전 필독사항
        </p>
        <p className="mt-4 text-gray-20 text-center text-[16px] pad:text-[18px] font-normal leading-[27px] hidden pad:block">
          안녕하세요! 홍익대학교 컴퓨터공학과 밴드학회 깔루아입니다.
        </p>
        <p className="text-gray-20 text-center text-[16px] pad:text-[18px] font-normal leading-[27px] max-pad:px-6">
          단순 인원 집계용으로 사용되는 가입 지원서이므로 부담 없이 작성해
          주시면 됩니다.
        </p>
      </div>
      <div className="w-full h-auto pad:rounded-b-xl pad:border border-gray-15 flex flex-col text-left">
        <ApplicantInfo
          PersonalInfo={PersonalInfo}
          onInfoChange={handlePersonalInfoChange}
        />
        <CLInfo
          CoverLetterInfo={CoverLetterInfo}
          onInfoChange={handleCLInfoChange}
        />
        <OtherInfo
          OtherInfo={AdditionalInfo}
          onInfoChange={handleOtherInfoChange}
        />
      </div>
      <button
        onClick={(e) => setShowLastCheckModal(true)}
        disabled={!isComplete || isSubmitting}
        className={`flex justify-center items-center text-center h-[60px] w-[328px] pad:w-[384px] text-[18px] rounded-[12px] mt-[40px] ph:mb-[100px] pad:mb-[140px] dt:mb-[180px] ${isComplete ? 'bg-primary-50 text-gray-0' : 'bg-gray-10 text-gray-40 cursor-not-allowed'}`}
      >
        제출하기
      </button>
      <LastCheckModal
        isOpen={showLastCheckModal}
        onClose={() => setShowLastCheckModal(false)}
        onReservationComplete={async () => {
          if (!isSubmitting) {
            await handleApplicationSubmit();
          }
        }}
        isSubmitting={isSubmitting}
      />
    </div>
  );
};

export default page;
