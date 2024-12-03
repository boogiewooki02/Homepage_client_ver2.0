import React from 'react';

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, children }) => {
  if (!isOpen) return null;

  const handleOverlayClick = (event: React.MouseEvent<HTMLDivElement>) => {
    if (event.target === event.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      onClick={handleOverlayClick}
      className="fixed z-50 top-0 left-0 right-0 bottom-0 bg-[#0000008a] flex justify-center items-center text-black"
    >
      <div className="fixed flex flex-col rounded-3xl w-[328px] h-auto pad:w-[560px] pad:h-[300px] bg-gray-0 px-[40px] py-[52px] pad:py-[80px] cursor-pointer">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          className="absolute right-[40px] top-[24px]"
          onClick={onClose}
        >
          <path
            d="M6 6L18 18M6 18L18 6"
            stroke="#31333F"
            strokeWidth="2"
            strokeLinecap="round"
            strokeLinejoin="round"
          />
        </svg>
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
};

export default Modal;
