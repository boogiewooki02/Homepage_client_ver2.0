'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import CancelPopup from '@/components/announcement/posting/CancelPopup';

interface TopButtonsProps {
  isPostActive: boolean;
  onPublish: () => void;
}

const TopButtons: React.FC<TopButtonsProps> = ({ isPostActive, onPublish }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const handleCancelClick = () => {
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
  };

  const handleModalConfirm = () => {
    router.back();
    setIsModalOpen(false);
  };

  const handlePublishClick = () => {
    if (isPostActive) {
      onPublish();
    }
  };

  return (
    <>
      <div className="flex justify-end mb-10">
        <div
          onClick={handleCancelClick}
          className="w-[51px] h-[46px] flex justify-center items-center rounded-[12px] mr-4 text-gray-40 text-[20px] font-[500] cursor-pointer"
        >
          취소
        </div>
        <div
          onClick={handlePublishClick}
          className={`w-[100px] h-[46px] flex justify-center items-center rounded-[12px] ${
            isPostActive
              ? 'bg-primary-50 cursor-pointer'
              : 'bg-gray-10 cursor-not-allowed'
          } text-[20px] font-[500] text-gray-0`}
        >
          게시하기
        </div>
      </div>
      {isModalOpen && (
        <CancelPopup
          onClose={handleModalClose}
          onConfirm={handleModalConfirm}
        />
      )}
    </>
  );
};

export default TopButtons;
