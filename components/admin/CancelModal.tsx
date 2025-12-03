import Modal from '../ui/Modal';

interface ModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const CancelModal = ({ isOpen, setIsOpen }: ModalProps) => {
  const handleModalClose = () => {
    setIsOpen(false);
    window.location.href = `/admin`;
  };

  return (
    <Modal isOpen={isOpen} onClose={() => handleModalClose()}>
      <p className="font-medium text-[18px] pad:px-[56px] text-center justify-center items-center">
        변경 사항은 저장되지 않습니다.
      </p>
    </Modal>
  );
};

export default CancelModal;
