import ButtonModal from '../ui/ButtonModal';

interface ModalProps {
  isOpen: boolean;
  setIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
  handleSubmit: () => void;
}

const EditModal: React.FC<ModalProps> = ({
  isOpen,
  setIsOpen,
  handleSubmit,
}) => {
  return (
    <ButtonModal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      mainContent={<p>공연 정보를 생성하시겠습니까?</p>}
      buttonContent={<p>생성하기</p>}
      handleSubmit={() => handleSubmit()}
    />
  );
};

export default EditModal;
