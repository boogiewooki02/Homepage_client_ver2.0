import React, { useEffect } from 'react';
import ButtonModal from '@/components/ui/ButtonModal';

interface DeletePostPopupProps {
  onClose: () => void;
  onConfirm: () => void;
  isOpen: boolean;
}

const CancelPopup: React.FC<DeletePostPopupProps> = ({
  onClose,
  onConfirm,
  isOpen,
}) => {
  useEffect(() => {
    document.body.style.overflow = 'hidden';
    return () => {
      document.body.style.overflow = '';
    };
  }, []);

  return (
    <ButtonModal
      isOpen={isOpen}
      onClose={onClose}
      handleSubmit={onConfirm}
      mainContent={
        <>
          <p>게시글을 삭제하시겠습니까?</p>
          <p>삭제하면 실행을 취소할 수 없습니다.</p>
        </>
      }
      buttonContent="삭제하기"
    />
  );
};

export default CancelPopup;
