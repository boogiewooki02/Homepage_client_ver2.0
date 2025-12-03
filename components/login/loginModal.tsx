import Modal from '../ui/Modal';

interface ModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
}

const LoginModal = ({ isOpen, setIsOpen }: ModalProps) => {
  const handleModalClose = () => {
    setIsOpen(false);
    window.location.href = `/`;
  };

  return (
    <Modal isOpen={isOpen} onClose={() => handleModalClose()}>
      <p className="font-semibold text-[24px]">가입 신청 완료</p>
      <p className="font-medium text-[18px] mt-[24px] pad:px-[56px]">
        깔루아 가입 신청이 완료되었습니다.
        <br />
        <span className=" text-primary-50">관리자 승인</span> 이후 가입이 완료된
        분께서는 KAHLUA 전용 서비스를 자유롭게 이용하실 수 있습니다.
      </p>
    </Modal>
  );
};

export default LoginModal;
