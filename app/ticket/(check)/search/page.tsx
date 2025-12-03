'use client';

import Link from 'next/link';
import { useEffect, useState } from 'react';

import { axiosInstance } from '@/api/auth/axios';
import NotFoundModal from '@/components/popups/ticket/NotFoundModal';

const Search = () => {
  const [reservationId, setReservationId] = useState('');
  const [dynamicHeightClass, setDynamicHeightClass] = useState('');
  const [showNotFoundModal, setShowNotFoundModal] = useState(false);

  const handleSearchReservation = async () => {
    try {
      const response = await axiosInstance.get(
        `/tickets/get?reservationId=${reservationId}`
      );
      if (response.status === 200) {
        window.location.href = `/ticket/reservation?reservationId=${reservationId}`;
      } else {
        setShowNotFoundModal(true);
      }
    } catch (error) {
      setShowNotFoundModal(true);
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { value } = event.target;
    if (value.length <= 10) {
      setReservationId(value);
    }
  };

  useEffect(() => {
    const updateHeightClass = () => {
      const screenHeight = window.screen.height;
      const adjustedHeight = screenHeight - 64;

      setDynamicHeightClass(`h-[${adjustedHeight}px]`);
    };

    updateHeightClass();
    window.addEventListener('resize', updateHeightClass);
    return () => {
      window.removeEventListener('resize', updateHeightClass);
    };
  }, []);

  const isButtonEnabled = reservationId.length === 10;
  const buttonClass = isButtonEnabled
    ? 'bg-primary-50 text-gray-0'
    : 'bg-gray-10 text-gray-40';

  return (
    <div
      className={`w-full pad:w-[786px] dt:w-[996px] flex flex-col relative mx-auto top-20 ${dynamicHeightClass}`}
    >
      <div className="h-[200px] w-full pad:rounded-t-xl bg-gray-90 flex flex-col mx-auto items-center justify-center gap-4">
        <p className="h-12 text-gray-0 text-center text-2xl font-semibold leading-[48px]">
          예매 내역 조회
        </p>
        <p className="text-gray-20 text-center text-lg  font-normal leading-[27px]">
          티켓 예매 내역을 확인하고 취소할 수 있습니다.
        </p>
      </div>
      <div className="h-[238px] w-full pad:rounded-b-xl pad:border pad:border-gray-15 flex flex-col mx-auto px-4 pad:px-12 dt:px-[102px]">
        <p className="mt-8 pad:mt-[72px] font-semibold leading-[30px] text-[18px] pad:text-[20px]">
          예매 번호 입력{' '}
        </p>
        <div className="flex flex-row gap-4 pad:gap-6 mt-4 items-center w-full">
          <input
            placeholder="예매 번호를 입력해주세요."
            value={reservationId}
            onChange={handleInputChange}
            className="flex h-12 w-full pad:w-[588px] rounded-xl border border-gray-15 px-4 py-3 text-[16px] font-normal focus:outline-none focus:border-primary-40 focus:outline-[1px]"
          />
          <button
            onClick={handleSearchReservation}
            className={`w-[180px] h-[59px] hidden pad:flex flex-shrink-0 text-center justify-center items-center mx-auto rounded-xl text-[18px] font-medium ${buttonClass} ${reservationId.length === 10 ? '' : 'cursor-not-allowed'}`}
            disabled={!isButtonEnabled}
          >
            조회하기
          </button>
          <button
            onClick={handleSearchReservation}
            className={`pad:hidden w-[70px] h-[48px] flex flex-shrink-0 text-center justify-center items-center mx-auto rounded-xl text-[16px] font-medium ${buttonClass} ${reservationId.length === 10 ? '' : 'cursor-not-allowed'}`}
            disabled={!isButtonEnabled}
          >
            조회
          </button>
        </div>
      </div>
      <Link
        href="/ticket/"
        className="fixed bottom-8 left-1/2 transform -translate-x-1/2 pad:relative pad:mt-20 pad:left-0 pad:-translate-x-0 w-[328px] pad:w-[384px] h-[59px] flex flex-shrink-0 text-center justify-center items-center mx-auto rounded-xl text-[18px] font-medium text-gray-60 bg-gray-5"
      >
        예매 페이지로 돌아가기
      </Link>
      <NotFoundModal
        isOpen={showNotFoundModal}
        onClose={() => setShowNotFoundModal(false)}
      />
    </div>
  );
};

export default Search;
