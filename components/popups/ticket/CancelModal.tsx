import Image from 'next/image';
import React from 'react';

import { CancelButton } from '@/components/ui/CancelButton';
import { ModalInput } from '@/components/ui/ModalInput';

interface CancelModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  isFreshman: boolean;
  inputValue: string;
  onInputChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}

const CancelModal = ({
  isOpen,
  onClose,
  onConfirm,
  isFreshman,
  inputValue,
  onInputChange,
}: CancelModalProps) => {
  if (!isOpen) return null;

  const handleOverlayClick = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      onClick={handleOverlayClick}
      className="fixed z-50 top-0 left-0 right-0 bottom-0 bg-[#0000008a] flex justify-center items-center"
    >
      <div className="fixed flex flex-col rounded-3xl w-[328px] h-[250px] pad:w-[652px] pad:h-[341px] z-50 bg-[white]">
        <div className="mt-5 pad:mt-0 pad:bg-gray-80 pad:h-[76px] px-6 pad:px-8 rounded-t-3xl w-full flex flex-row justify-between items-center">
          <h2 className="hidden pad:flex text-2xl font-semibold text-gray-0">
            예매를 취소하시겠습니까?
          </h2>
          <h2 className="flex pad:hidden text-[18px] font-semibold text-gray-90">
            예매 취소
          </h2>
          <Image
            src="/image/tabler_x.svg"
            width={24}
            height={24}
            alt="X"
            onClick={onClose}
          />
        </div>
        <div className="pad:h-[265px] pad:px-8 w-full pt-5 pad;pt-10 pb-8">
          <p className="px-6 pad:px-0 ont-medium leading-[30px] text=[16px] pad:text-[20px] text-gray-90">
            취소하시려면 {isFreshman ? '학번을' : '전화번호를'} 입력해주세요.
          </p>
          <ModalInput
            placeholder="-없이 입력"
            className="mt-3 pad:mt-4 mx-6 pad:mx-0"
            value={inputValue}
            onChange={onInputChange}
          />
          <CancelButton
            onClick={onConfirm}
            className="mt-10 w-full pad:w-[180px] text-center pad:ml-auto"
          >
            예매 취소
          </CancelButton>
        </div>
      </div>
    </div>
  );
};

export default CancelModal;
