'use client';
import { useState } from 'react';
import ButtonModal from '../ui/ButtonModal';
import { useRouter } from 'next/navigation';
import { authInstance } from '@/api/auth/axios';
import { CategoryToggle } from './CategoryToggle';
import ReservationList from './ReservationList';
import MyPostsList from './MyPostsList';

interface toggleProps {
  toggle: string;
}

const toggleList: Array<toggleProps> = [
  { toggle: '동방 예약 확인' },
  { toggle: '내가 쓴 글' },
];

const List = () => {
  const [toggle, setToggle] = useState(toggleList[0].toggle);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const router = useRouter();

  const toggleHandler = (toggleItem: string) => {
    setToggle(toggleItem);
  };

  const handleSignOut = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  return (
    <div className="flex flex-col w-full min-h-screen px-4 pad:px-0 pad:mx-auto pad:w-[786px] dt:w-[1200px] mt-6 pad:mt-10">
      <section className="flex justify-between">
        {/* 카테고리 토글 */}
        <CategoryToggle toggle={toggle} onToggleChange={toggleHandler} />
        {/* 탈퇴 버튼 */}
        <button
          className="flex items-start text-gray-30 text-xl font-medium leading-[30px] cursor-pointer"
          onClick={handleSignOut}
        >
          회원 탈퇴
        </button>
      </section>

      {/* 리스트 */}
      <section className="flex flex-col border-t-[1px] border-t-black border-b-[1px] border-b-black">
        {toggle === toggleList[0].toggle && <ReservationList />}
        {toggle === toggleList[1].toggle && <MyPostsList />}
      </section>

      {/* 탈퇴 모달 */}
      <ButtonModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        handleSubmit={async () => {
          try {
            const response = await authInstance.delete('/auth/withdraw');

            if (response.data.isSuccess) {
              alert('회원 탈퇴가 완료되었습니다.');
              router.push('/');
            }
          } catch (error) {
            console.error(error);
          }
        }}
        mainContent="회원을 탈퇴하시겠습니까?"
        buttonContent="탈퇴하기"
      />
    </div>
  );
};

export default List;
