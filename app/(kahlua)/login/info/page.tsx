'use client';

import * as React from 'react';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import LoginModal from '@/components/login/loginModal';
import LoginSelectBox from '@/components/login/LoginSelectBox';
import NameInput from '@/components/login/nameInput';
import { authInstance } from '@/api/auth/axios';
import { useSetRecoilState } from 'recoil';
import { isLoggedInState } from '@/atoms/authAtom';

// 기수 23 ~ 1기
const generations: string[] = Array.from(
  { length: 23 },
  (_, i) => `${23 - i}기`
);

// 세션
const sessions: string[] = ['보컬', '드럼', '기타', '베이스', '신디사이저'];
const sessionMap: { [key: string]: string } = {
  보컬: 'VOCAL',
  드럼: 'DRUM',
  기타: 'GUITAR',
  베이스: 'BASS',
  신디사이저: 'SYNTHESIZER',
};

const Page = () => {
  const [name, setName] = useState<string>('');
  const [generation, setGeneration] = useState<string>('');
  const [session, setSession] = useState<string>('');
  const [isComplete, setIsComplete] = useState<boolean>(false);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const setIsLoggedIn = useSetRecoilState(isLoggedInState);

  useEffect(() => {
    setIsComplete(name !== '' && generation !== '' && session !== '');
  }, [name, generation, session]);

  const handleSubmit = async () => {
    const termData: number = parseInt(generation.replace('기', ''), 10); // term : integer type으로 변환
    const sessionData: string = sessionMap[session]; // session : enum type으로 변환

    console.log(sessionData, name, termData);
    try {
      const response = await authInstance.post('/user', {
        name: name,
        term: termData,
        session: sessionData,
      });

      if (response.data.isSuccess) {
        setIsModalOpen(true); // login modal open
        setIsLoggedIn(true); // recoil login 상태 업데이트
      }
    } catch (error) {
      console.error('회원가입 실패:', error);
    }
  };

  return (
    <div className="font-pretendard w-full min-h-[calc(100vh-320px)] h-full flex justify-center items-center mt-16 text-gray-0 text-center max-pad:-mb-40 max-pad:bg-gray-90">
      <div className="w-full h-full justify-center items-center pad:w-[786px] dt:w-[876px] pad:h-[536px] flex flex-col pt-[32px] pad:pt-[58px] pb-[78px] px-[16px] pad:px-[64px] dt:px-[118px] gap-[48px] bg-gray-90 pad:rounded-[24px] mt-[16px] pad:mt-[32px]">
        <div className="flex flex-col gap-[16px] w-full justify-center items-center">
          <div className="font-semibold text-[64px]">JOIN</div>
          <div className="font-medium text-[16px] pad:text-[20px] text-gray-20">
            깔루아 회원만 가입 신청 가능합니다.
            <br />
            가입 신청 이후 관리자 인증을 거쳐 KAHLUA 전용 서비스를 이용하실 수
            있습니다.
          </div>
        </div>
        <div className="flex flex-col pad:flex-row gap-[20px] justify-center items-center text-[16px]">
          <NameInput data={name} setData={setName} />
          <LoginSelectBox
            data={generation}
            setData={setGeneration}
            id="generation"
            itemList={generations}
          >
            기수
          </LoginSelectBox>
          <LoginSelectBox
            data={session}
            setData={setSession}
            id="session"
            itemList={sessions}
          >
            세션
          </LoginSelectBox>
        </div>
        <button
          className={`w-full pad:w-[384px] h-[60px] flex items-center justify-center rounded-[12px] text-[22px] ${isComplete ? 'bg-primary-50 text-gray-0' : 'bg-gray-10 text-gray-40 cursor-not-allowed'}`}
          disabled={!isComplete}
          onClick={handleSubmit}
        >
          KAHLUA 가입 신청하러 가기
        </button>
        <LoginModal isOpen={isModalOpen} setIsOpen={setIsModalOpen} />
      </div>
    </div>
  );
};

export default Page;
