'use client';
import { useState } from 'react';
import ButtonModal from '../ui/ButtonModal';
import { useRouter } from 'next/navigation';
import { authInstance } from '@/api/auth/axios';
import { ReservationList } from './ReservationList';
import { MyPostList } from './MyPostList';

interface toggleProps {
  toggle: string;
}

const toggleList: Array<toggleProps> = [
  { toggle: '동방 예약 확인' },
  { toggle: '내가 쓴 글' },
];

// 카테고리 토글
export const CategoryToggle = (props: {
  toggleHandler: (arg0: string) => void;
  toggle: string;
}) => {
  return (
    <section className="flex flex-col gap-6 pad:flex-row pad:gap-0 mb-6 text-2xl font-semibold justify-between">
      <ul className="flex gap-6">
        {toggleList.map((category) => {
          return (
            <li
              key={category.toggle}
              onClick={() => {
                props.toggleHandler(category.toggle);
              }}
              className={`cursor-pointer text-xl pad:text-2xl ${props.toggle === category.toggle ? 'text-black' : 'text-gray-40'}`}
            >
              {category.toggle}
            </li>
          );
        })}
      </ul>
    </section>
  );
};

const List = () => {
  const [toggle, setToggle] = useState('동방 예약 확인');
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
    <div className="flex flex-col w-full px-4 pad:px-0 pad:mx-auto pad:w-[786px] dt:w-[1200px] mt-6 pad:mt-10 min-h-full">
      <section className="flex justify-between">
        {/* 카테고리 토글 */}
        <CategoryToggle toggle={toggle} toggleHandler={toggleHandler} />
        {/* 탈퇴 버튼 */}
        <button
          className="flex items-start text-gray-30 text-sm font-medium leading-[30px] cursor-pointer"
          onClick={handleSignOut}
        >
          회원 탈퇴
        </button>
      </section>

      {/* 리스트 */}
      <section className="flex flex-col border-t-[1px] border-t-black border-b-[1px] border-b-black">
        {toggle === toggleList[0].toggle && <ReservationList />}
        {toggle === toggleList[1].toggle && <MyPostList />}
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
