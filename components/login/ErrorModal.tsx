'use client';

import Modal from '../ui/Modal';

interface ModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const ErrorModal: React.FC<ModalProps> = ({ isOpen, setIsOpen }) => {
  const handleModalClose = () => {
    setIsOpen(false);
    window.location.href = `/`;
  };

  return (
    <Modal isOpen={isOpen} onClose={() => handleModalClose()}>
      <p className="font-semibold text-[24px]">접근 제한</p>
      <p className="font-medium text-[18px] mt-[24px] pad:px-[56px]">
        접근 권한이 없습니다.
      </p>
    </Modal>
  );
};

export default ErrorModal;
