import Image from 'next/image';

interface NotFoundModalProps {
  isOpen: boolean;
  onClose: () => void;
}

const NotFoundModal = ({ isOpen, onClose }: NotFoundModalProps) => {
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
      <div className="fixed flex flex-col rounded-3xl w-[328px] h-[166px] pad:w-[560px] pad:h-[210px] z-50 bg-gray-0 px-6 pad:px-8">
        <Image
          src="/image/black_x.svg"
          width={24}
          height={24}
          alt="X"
          onClick={onClose}
          className="ml-auto mt-6 cursor-pointer"
        />
        <p className="text-[18px] pad:text-[22px] font-medium leading-[27px] pad:leading-[33px] text-gray-90 text-center mt-2 pad:mt-6">
          입력한 정보가 일치하지 않습니다.
          <br />
          다시 확인해주세요.
        </p>
      </div>
    </div>
  );
};

export default NotFoundModal;
