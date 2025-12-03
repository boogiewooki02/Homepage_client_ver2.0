'use client';

import React, { useState } from 'react';

import DetailsErrorModal from '@/components/popups/ticket/DetailsErrorModal';
import LastCheckModal from '@/components/popups/ticket/LastCheckModal';
import ReservedErrorModal from '@/components/popups/ticket/ReservedErrorModal';

interface FinishStepProps {
  price: number;
  amount: number;
  handleSubmit: () => Promise<void>;
  onReservationComplete: () => void;
  isFormComplete: boolean;
  onAlreadyReserved: () => void;
  isAlreadyReserved: boolean;
  setShowLastCheckModal: (value: boolean) => void;
  showLastCheckModal: boolean;
}

const FinalStep = ({
  price,
  amount,
  handleSubmit,
  isFormComplete,
  onAlreadyReserved,
  isAlreadyReserved,
  showLastCheckModal,
  setShowLastCheckModal,
}: FinishStepProps) => {
  const [showDetailsErrorModal, setShowDetailsErrorModal] = useState(false);
  const [showReservedErrorModal, setShowReservedErrorModal] = useState(false);
  const priceValue = price || 0;
  const finalAmount = priceValue * amount;

  const handleClickReservation = () => {
    if (isFormComplete) {
      setShowLastCheckModal(true);
    } else if (isAlreadyReserved) {
      setShowReservedErrorModal(true);
    } else {
      setShowDetailsErrorModal(true);
    }
  };

  const handleLastCheckModalClose = () => {
    setShowLastCheckModal(false);
  };

  const handleReservationSubmit = async () => {
    await handleSubmit();
    if (!isAlreadyReserved) {
      setShowLastCheckModal(false);
    } else {
      setShowLastCheckModal(false);
      setShowReservedErrorModal(true);
    }
  };

  return (
    <div className="flex flex-col mt-10 w-full">
      <div className="flex flex-row w-full">
        <div className="flex flex-col pad:ml-12 ml-4">
          <div className="text-gray-50 font-normal text-[14px] pad:text-[18px] leading-[27px]">
            {priceValue === 0
              ? `무료 x ${amount}매`
              : `${priceValue.toLocaleString()}원 x ${amount}매`}
          </div>
          <div className="flex flex-row w-[84px] pad:w-[289px] h-[27px] pad:h-[48px] gap-4 items-center">
            <p className="hidden pad:flex w-[137px] text-gray-70 font-medium text-[24px] leading-9">
              최종 결제 금액
            </p>
            <div className="text-primary-50 font-semibold text-[18px] pad:text-[32px] leading-[48px] whitespace-nowrap">
              {finalAmount === 0 ? '무료' : `${finalAmount.toLocaleString()}원`}
            </div>
          </div>
        </div>
        <button
          onClick={handleClickReservation}
          className="mr-4 pad:mr-12 pad:mt-[20px] w-[182px] pad:w-[384px] h-[52px] pad:h-[59px] flex flex-shrink-0 text-center justify-center items-center ml-auto rounded-xl text-[16px] pad:text-[18px] font-medium text-gray-0 bg-primary-50"
        >
          예매하기
        </button>
      </div>
      <div className="w-full h-10 flex pad:hidden" />
      <ReservedErrorModal
        isOpen={showReservedErrorModal}
        onClose={() => setShowReservedErrorModal(false)}
        onAlreadyReserved={onAlreadyReserved}
      />
      <DetailsErrorModal
        isOpen={showDetailsErrorModal}
        onClose={() => setShowDetailsErrorModal(false)}
      />
      <LastCheckModal
        isOpen={showLastCheckModal}
        onClose={handleLastCheckModalClose}
        onReservationComplete={handleReservationSubmit}
      />
    </div>
  );
};

export default FinalStep;
