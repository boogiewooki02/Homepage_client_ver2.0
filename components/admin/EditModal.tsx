import ButtonModal from '../ui/ButtonModal';

interface ModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmit: () => void;

  mainContent?: React.ReactNode;
  buttonContent?: React.ReactNode;
}

const EditModal: React.FC<ModalProps> = ({
  isOpen,
  setIsOpen,
  handleSubmit,
  mainContent = <p>공연 정보를 수정하시겠습니까?</p>,
  buttonContent = <p>수정하기</p>,
}) => {
  return (
    <ButtonModal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      mainContent={mainContent}
      buttonContent={buttonContent}
      handleSubmit={() => handleSubmit()}
    />
  );
};

export default EditModal;
