'use client';
import { useState, useEffect, useCallback } from 'react';
import ButtonModal from '../ui/ButtonModal';
import { useRouter } from 'next/navigation';
import { authInstance } from '@/api/auth/axios';
import { ReservationList } from './ReservationList';
import { MyPostList } from './MyPostList';
import { CategoryToggle } from './CategoryToggle';
import { toggleList } from './category';
import Pagination from '@/components/announcement/list/Pagination';

interface myPostProps {
  title: string;
  like: number;
  comment: number;
  date: string;
}

// dummy data
const dummyMyPost: myPostProps[] = [
  {
    title: '제목1제목1제목1제목1제목1제목1제목1',
    like: 10,
    comment: 5,
    date: '2024.10.30',
  },
  {
    title: '제목2',
    like: 20,
    comment: 3,
    date: '2024.10.31',
  },
  {
    title: '제목3',
    like: 30,
    comment: 2,
    date: '2024.11.01',
  },
  {
    title: '제목4',
    like: 40,
    comment: 1,
    date: '2024.11.02',
  },
  {
    title: '제목1제목1제목1제목1제목1제목1제목1',
    like: 10,
    comment: 5,
    date: '2024.10.30',
  },
  {
    title: '제목2',
    like: 20,
    comment: 3,
    date: '2024.10.31',
  },
  {
    title: '제목3',
    like: 30,
    comment: 2,
    date: '2024.11.01',
  },
  {
    title: '제목4',
    like: 40,
    comment: 1,
    date: '2024.11.02',
  },
];

// dummy data
const dummyReservation: myPostProps[] = [
  {
    title: '제목1제목1제목1제목1제목1제목1제목1',
    like: 10,
    comment: 5,
    date: '2024.10.30',
  },
  {
    title: '제목2',
    like: 20,
    comment: 3,
    date: '2024.10.31',
  },
  {
    title: '제목3',
    like: 30,
    comment: 2,
    date: '2024.11.01',
  },
];

const List = () => {
  const [toggle, setToggle] = useState(toggleList[0].toggle);
  const [searchQuery, setSearchQuery] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [pageGroup, setPageGroup] = useState(0);

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

  // 조건 처리
  const items =
    toggle === toggleList[0].toggle ? dummyReservation : dummyMyPost;

  // 필터링된 아이템
  const filteredItems = useCallback(
    () =>
      items.filter((post) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase())
      ),
    [items, searchQuery]
  );

  // 필터링된 아이템 개수
  const totalItems = filteredItems().length;

  // 페이지 계산
  const totalPages = Math.ceil(totalItems / itemsPerPage);
  const pagesPerGroup = 5;

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handlePrevGroup = () => {
    if (pageGroup > 0) {
      setPageGroup(pageGroup - 1);
      setCurrentPage((pageGroup - 1) * pagesPerGroup + 1); // 이전 그룹의 첫 페이지로 이동
    }
  };

  const handleNextGroup = () => {
    if ((pageGroup + 1) * pagesPerGroup < totalPages) {
      setPageGroup(pageGroup + 1);
      setCurrentPage((pageGroup + 1) * pagesPerGroup + 1); // 다음 그룹의 첫 페이지로 이동
    }
  };

  useEffect(() => {
    // 반응형 - 페이지 내에서 보이는 게시글 개수 조절
    const handleResize = () => {
      const newItemsPerPage = window.innerWidth >= 768 ? 10 : 5;

      // 현재 페이지에 표시되는 첫 아이템의 인덱스를 기반으로 새로운 페이지 번호 계산
      const currentItemIndex = (currentPage - 1) * itemsPerPage;
      const newPage = Math.floor(currentItemIndex / newItemsPerPage) + 1;

      setItemsPerPage(newItemsPerPage);
      setCurrentPage(newPage);
      setPageGroup(Math.floor((newPage - 1) / pagesPerGroup)); // 페이지 그룹 재설정
    };

    window.addEventListener('resize', handleResize);
    handleResize();

    return () => window.removeEventListener('resize', handleResize);
  }, [currentPage, itemsPerPage]);

  // 탭이 바뀔 때마다 검색창, 페이지, 페이지 그룹 초기화
  useEffect(() => {
    setSearchQuery('');
    setCurrentPage(1);
    setPageGroup(0);
  }, [toggle]);

  return (
    <div className="flex flex-col w-full px-4 pad:px-0 pad:mx-auto pad:w-[786px] dt:w-[1200px] mt-6 pad:mt-10 min-h-screen">
      <section className="flex justify-between">
        {/* 카테고리 토글 */}
        <CategoryToggle toggle={toggle} onToggleChange={toggleHandler} />
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
        {toggle === toggleList[1].toggle && (
          <MyPostList
            items={filteredItems()}
            currentPage={currentPage}
            itemsPerPage={itemsPerPage}
          />
        )}
      </section>

      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        pageGroup={pageGroup}
        pagesPerGroup={pagesPerGroup}
        onPageChange={handlePageChange}
        onPrevGroup={handlePrevGroup}
        onNextGroup={handleNextGroup}
      />
      {/* 리스트 */}
      {/* <section className="flex flex-col border-t-[1px] border-t-black border-b-[1px] border-b-black">
        {toggle === toggleList[0].toggle && <ReservationList />}
        {toggle === toggleList[1].toggle && <MyPostList />}
      </section> */}

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
