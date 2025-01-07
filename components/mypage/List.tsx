'use client';
import likeIcon from '@/public/image/mypage/grayHeart.svg';
import chatIcon from '@/public/image/mypage/grayChat.svg';
import Image from 'next/image';
import { useEffect, useState, useEffect, useCallback } from 'react';
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
import Pagination from '@/components/announcement/list/Pagination';

interface reservationProps {
  date: string;
  time: string;
  status: string;
}

interface myPostProps {
  title: string;
  like: number;
  comment: number;
  date: string;
}

interface toggleProps {
  toggle: string;
}

const toggleList: Array<toggleProps> = [
  { toggle: '동방 예약 확인' },
  { toggle: '내가 쓴 글' },
];

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

interface ReservationProps {
  reservationId: number;
  email: string;
  type: string;
  clubroomUsername: string;
  reservationDate: string;
  startTime: string;
  endTime: string;
  status: string;
}

// 동방 예약 내역 리스트
export const ReservationList = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [reservations, setReservations] = useState<ReservationProps[]>([]);

  const getReservationList = async () => {
    try {
      const response = await authInstance.get('/my-page/reservation');
      setReservations(response.data.result.reservationResponseList);
    } catch (error) {
      console.error(error);
    }
  };

  // 개별 취소를 위한 선택한 예약 정보 state
  const [selectedReservation, setSelectedReservation] = useState<{
    reservationId: number;
  } | null>(null);

  const handleCancleReservation = (reservationId: number) => {
    setSelectedReservation({ reservationId });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSelectedReservation(null); // 선택된 예약 초기화
  };

  const handleSubmitCancellation = () => {
    console.log(`예약 취소: ${selectedReservation?.reservationId}`);

    const deleteReservation = async (id: number) => {
      try {
        const response = await authInstance.delete(
          `/my-page/reservation/${id}`
        );
        setReservations(
          reservations.filter((reservation) => reservation.reservationId !== id)
        );

        console.log(`예약 ID ${id} 삭제 성공`);
      } catch (error) {
        console.error('예약 취소 실패:', error);
      }
    };

    // 예약 취소 로직 작성 필요
    handleCloseModal();
  };

  useEffect(() => {
    getReservationList();
  }, []);

  return (
    <div>
      <ul>
        {reservations.map((reservation) => {
          return (
            <li
              key={reservation.reservationId}
              className="flex flex-col pad:flex-row py-6 pad:items-center ph:items-start gap-4 self-stretch relative border-y-[1px] border-y-solid border-y-gray-10"
            >
              <div className="flex gap-4">
                <p className="text-black text-xl font-semibold">
                  {reservation.reservationDate}
                </p>
                <p className="text-black text-xl font-semibold">
                  {reservation.startTime} - {reservation.endTime}
                </p>
              </div>
              <div className="flex py-1 px-2 justify-center items-center gap-[10px] rounded-full border-[1px] border-solid border-primary-50">
                <p className="flex items-center text-primary-50 text-base font-normal">
                  {reservation.type === 'TEAM'
                    ? `팀 : ${reservation.clubroomUsername}`
                    : `${reservation.clubroomUsername}`}
                </p>
              </div>
              <p
                className="flex items-center text-danger-40 text-base font-normal absolute right-0 bottom-6 pad:top-6 cursor-pointer"
                onClick={() =>
                  handleCancleReservation(reservation.reservationId)
                }
              >
                예약 취소하기
              </p>
            </li>
          );
        })}
      </ul>
      {/* 취소 모달 */}
      <ButtonModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        handleSubmit={handleSubmitCancellation}
        mainContent="예약을 취소하시겠습니까?"
        buttonContent="취소하기"
      />
    </div>
  );
};

// 내가 쓴 글 리스트
export const MyPostList = () => {
  const [currentPage, setCurrentPage] = useState(1);
  const [itemsPerPage, setItemsPerPage] = useState(5);
  const [pageGroup, setPageGroup] = useState(0);

  const totalItems = dummyMyPost.length;
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

  // 현재 페이지에 해당하는 데이터 계산
  const paginatedItems = dummyMyPost.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

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

  return (
    <div>
      <ul>
        {paginatedItems.map((post) => {
          return (
            // li 태그 스타일 코드는 그대로 쓰셔도 됩니다.
            <li
              key={post.title + post.date}
              className="flex flex-col pad:flex-row py-6 items-start gap-4 self-stretch relative border-y-[1px] border-y-solid border-y-gray-10 justify-between"
            >
              <p className="text-[20px] leading-6">{post.title}</p>

              <div className="flex gap-10 text-gray-40">
                <div className="flex gap-6">
                  <div className="flex gap-[10px]">
                    <Image src={likeIcon} alt="like" width={14} height={14} />
                    <p>{post.like}</p>
                  </div>
                  <div className="flex gap-[10px]">
                    <Image src={chatIcon} alt="chat" width={18} height={18} />
                    <p>{post.comment}</p>
                  </div>
                </div>
                <p>{post.date}</p>
              </div>
            </li>
          );
        })}
      </ul>
      {/* 페이지네이션 */}
      <Pagination
        currentPage={currentPage}
        totalPages={totalPages}
        pageGroup={pageGroup}
        pagesPerGroup={pagesPerGroup}
        onPageChange={handlePageChange}
        onPrevGroup={handlePrevGroup}
        onNextGroup={handleNextGroup}
      />
    </div>
  );
};

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
    <div className="flex flex-col w-full px-4 pad:px-0 pad:mx-auto pad:w-[786px] dt:w-[1200px] mt-6 pad:mt-10">
      <section className="flex justify-between">
        {/* 카테고리 토글 */}
        {/* <CategoryToggle toggle={toggle} onToggleChange={toggleHandler} /> */}
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
