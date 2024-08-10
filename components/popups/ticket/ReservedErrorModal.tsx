import React from 'react';
import Image from 'next/image';

interface ReservedErrorModalProps {
    isOpen: boolean;
    onClose: () => void;
    onAlreadyReserved: () => void;
}

const ReservedErrorModal: React.FC<ReservedErrorModalProps> = ({ isOpen, onClose, onAlreadyReserved }) => {
    if (!isOpen) return null;

    const handleOverlayClick = (
        event: React.MouseEvent<HTMLDivElement, MouseEvent>
    ) => {
        if (event.target === event.currentTarget) {
            onClose();
        }
    };

    return (
        <div onClick={handleOverlayClick} className="fixed z-50 top-0 left-0 right-0 bottom-0 bg-[#0000008a] flex justify-center items-center">
            <div className="fixed flex flex-col rounded-3xl w-[328px] h-[199px] pad:w-[560px] pad:h-[264px] z-50 bg-gray-0">
                <div className='flex flex-col rounded-t-3xl w-full px-6 pad:px-8'>
                    <Image src="/image/black_x.svg" width={24} height={24} alt="X" onClick={onClose} className='ml-auto mt-6 cursor-pointer' />
                    <p className='h-12 pad:h-[66px] text-[18px] pad:text-[22px] font-medium leading-[27px] pad:leading-[33px] text-gray-90 text-center mt-2 pad:mt-6'>
                        이미 예약한 정보입니다.<br />
                        입력한 정보를 다시 확인해주세요.
                    </p>
                </div>
                <div className='mt-10 pad:mt-14 flex flex-row w-full h-[59px] pad:h-[70px]'>
                    <button className='w-[280px] h-full rounded-bl-3xl border-t-gray-15 text-center text-[18px] pad:text-[20px] font-medium text-gray-40' onClick={onClose}>돌아가기</button>
                    <button className='w-[280px] h-full rounded-br-3xl bg-primary-50 text-center text-[18px] pad:text-[20px] font-medium text-gray-0' onClick={onAlreadyReserved}>예매 내역 조회</button>
                </div>
            </div>
        </div>
    );
};

export default ReservedErrorModal;
